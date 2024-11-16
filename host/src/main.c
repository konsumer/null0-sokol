#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#include "host.h"

static void frame() {
  int width = sapp_width(), height = sapp_height();
  float ratio = width / (float)height;

  sgp_begin(width, height);

  // this will set coordinates to -1,1 centered on 0,0
  // sgp_viewport(0, 0, width, height);
  // sgp_project(-ratio, ratio, 1.0f, -1.0f);

  wasm_host_update();

  sg_pass pass = {.swapchain = sglue_swapchain()};
  sg_begin_pass(&pass);
  sgp_flush();
  sgp_end();
  sg_end_pass();
  sg_commit();
}

static void init() {
  sg_desc sgdesc = {
      .environment = sglue_environment(), .logger.func = slog_func
  };
  sg_setup(&sgdesc);
  if (!sg_isvalid()) {
    fprintf(stderr, "Failed to create graphics context!\n");
    exit(-1);
  }
  sgp_desc sgpdesc = {0};
  sgp_setup(&sgpdesc);
  if (!sgp_is_valid()) {
    fprintf(
        stderr, "Failed to create graphics context: %s\n",
        sgp_get_error_message(sgp_get_last_error())
    );
    exit(-1);
  }
}

static void cleanup() {
  sgp_shutdown();
  sg_shutdown();
  wasm_host_unload();
}

sapp_desc sokol_main(int argc, char *argv[]) {
  int r = wasm_host_load(argv[1]);
  if (r != 0) {
    exit(r);
  }

  (void)argc;
  (void)argv;
  return (sapp_desc
  ){.init_cb = init,
    .frame_cb = frame,
    .cleanup_cb = cleanup,
    .width = 320,
    .height = 240,
    .window_title = "null0",
    .logger.func = slog_func};
}
