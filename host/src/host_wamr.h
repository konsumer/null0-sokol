#include <string.h>
#include <stdlib.h>
#include <time.h>
#include "wasm_c_api.h"
#include "wasm_export.h"

static int null0_millis() {
  struct timespec now;
  timespec_get(&now, TIME_UTC);
  return ((unsigned int)now.tv_sec) * 1000 + ((unsigned int)now.tv_nsec) / 1000000;
}

static char global_heap_buf[512 * 1024];
static wasm_val_t func_args[2];
static wasm_function_inst_t cart_update = NULL;
static wasm_function_inst_t cart_unload = NULL;
static wasm_function_inst_t cart_buttonUp = NULL;
static wasm_function_inst_t cart_buttonDown = NULL;
static wasm_function_inst_t cart_keyUp = NULL;
static wasm_function_inst_t cart_keyDown = NULL;

static wasm_exec_env_t exec_env;
static wasm_module_t module;
static wasm_module_inst_t module_inst;

// copy a pointer from cart to host
void* copy_from_cart(unsigned int cartPtr, unsigned int size) {
  void* out = malloc(size);
  void* cartHostPtr = wasm_runtime_addr_app_to_native(module_inst, (uint64_t)cartPtr);
  memcpy(out, cartHostPtr, size);
  return out;
}

// copy a pointer from host to cart
unsigned int copy_to_cart(void* hostPtr, unsigned int size) {
  return (unsigned int) wasm_runtime_module_dup_data(module_inst, (const char*)hostPtr, (uint64_t) size);
}

/// API

// send a string to host
// void test_string_in(char* str);
void test_string_in(wasm_exec_env_t exec_env, char* str) {
  printf("host: test_string_in - %s\n", str);
}

// return a string from host
// char* test_string_out();
unsigned int test_string_out(wasm_exec_env_t exec_env){
  char* str = "hi!";
  return copy_to_cart(str, strlen(str) + 1);
}

// send some bytes to host
// void test_bytes_in(unsigned char* bytes, unsigned int bytesLen);
void test_bytes_in(wasm_exec_env_t exec_env, unsigned char* bytes, unsigned int bytesLen) {
  printf("host: test_bytes_in (%u) - %u %u %u %u\n", bytesLen, bytes[0], bytes[1], bytes[2], bytes[3]);
}

// return some bytes from host
// unsigned char* test_bytes_out(unsigned int* outLen);
unsigned int test_bytes_out(wasm_exec_env_t exec_env, unsigned int* outLen) {
  *outLen = 4;
  unsigned char bytes[] = {0,1,2,3};
  return copy_to_cart(bytes, *outLen);
}

// send struct to host
// void test_struct_in(TestPoint* point);
void test_struct_in(wasm_exec_env_t exec_env,  unsigned int pointPntr) {
  TestPoint* point = copy_from_cart(pointPntr, sizeof(TestPoint));
  printf("host: test_struct_in - %ux%u\n", point->x, point->y);
}

// return struct from host
// TestPoint* test_struct_out();
unsigned int test_struct_out(wasm_exec_env_t exec_env) {
  TestPoint point = {.x=200, .y=100};
  return copy_to_cart(&point, sizeof(point));
}

/// SOKOL

// Saves current transform matrix, to be restored later with a pop.
static void push_transform(wasm_exec_env_t exec_env) {
  sgp_push_transform();
}

// Restore transform matrix to the same value of the last push.
static void pop_transform(wasm_exec_env_t exec_env) {
  sgp_pop_transform();
}

// Resets the transform matrix to identity (no transform).
static void reset_transform(wasm_exec_env_t exec_env) {
  sgp_reset_transform();
}

// Translates the 2D coordinate space.
static void translate(wasm_exec_env_t exec_env, float x, float y) {
  sgp_translate(x, y);
}

// Rotates the 2D coordinate space around the origin.
static void rotate(wasm_exec_env_t exec_env, float theta) {
  sgp_rotate(theta);
}

// Rotates the 2D coordinate space around a point.
static void rotate_at(wasm_exec_env_t exec_env, float theta, float x, float y) {
  sgp_rotate_at(theta, x, y);
}

// Scales the 2D coordinate space around the origin.
static void scale(wasm_exec_env_t exec_env, float sx, float sy) {
  sgp_scale(sx, sy);
}

// Scales the 2D coordinate space around a point.
static void scale_at(wasm_exec_env_t exec_env, float sx, float sy, float x, float y) {
  sgp_scale_at(sx, sy, x, y);
}

// Sets current blend mode.
static void set_blend_mode(wasm_exec_env_t exec_env, sgp_blend_mode blend_mode) {
  sgp_set_blend_mode(blend_mode);
}

// Resets current blend mode to default (no blending).
static void reset_blend_mode(wasm_exec_env_t exec_env) {
  sgp_reset_blend_mode();
}

// Sets current color modulation.
static void set_color(wasm_exec_env_t exec_env, float r, float g, float b, float a) {
  sgp_set_color(r, g, b, a);
}

// Resets current color modulation to default (white).
static void reset_color(wasm_exec_env_t exec_env) {
  sgp_reset_color();
}

// Sets current bound image in a texture channel.
static void set_image(wasm_exec_env_t exec_env, int channel, unsigned int image) {
  sgp_set_image(channel, null0_get_image(image));
}

// Remove current bound image in a texture channel (no texture).
static void unset_image(wasm_exec_env_t exec_env, int channel) {
  sgp_unset_image(channel);
}

// Resets current bound image in a texture channel to default (white texture).
static void reset_image(wasm_exec_env_t exec_env, int channel) {
  sgp_reset_image(channel);
}

// Sets the screen area to draw into.
static void viewport(wasm_exec_env_t exec_env, int x, int y, int w, int h) {
  sgp_viewport(x, y, w, h);
}

// Reset viewport to default values (0, 0, width, height).
static void reset_viewport(wasm_exec_env_t exec_env) {
  sgp_reset_viewport();
}

// Set clip rectangle in the viewport.
static void scissor(wasm_exec_env_t exec_env, int x, int y, int w, int h) {
  sgp_scissor(x, y, w, h);
}

// Resets clip rectangle to default (viewport bounds).
static void reset_scissor(wasm_exec_env_t exec_env) {
  sgp_reset_scissor();
}

// Reset all state to default values.
static void reset_state(wasm_exec_env_t exec_env) {
  sgp_reset_state();
}

// Clears the current viewport using the current state color.
static void clear(wasm_exec_env_t exec_env) {
  sgp_clear();
}

// Draws points in a batch.
static void draw_points(wasm_exec_env_t exec_env, unsigned int  pointsPtr, unsigned int count) {
  const sgp_point* points = copy_from_cart(pointsPtr, count * sizeof(sgp_point));
  sgp_draw_points(points, count);
}

// Draws a single point.
static void draw_point(wasm_exec_env_t exec_env, float x, float y) {
  sgp_draw_point(x, y);
}

// Draws lines in a batch.
static void draw_lines(wasm_exec_env_t exec_env, unsigned int linesPtr, unsigned int count) {
  const sgp_line* lines = copy_from_cart(linesPtr, count * sizeof(sgp_line));
  sgp_draw_lines(lines, count);
}

// Draws a single line.
static void draw_line(wasm_exec_env_t exec_env, float ax, float ay, float bx, float by) {
  sgp_draw_line(ax, ay, bx, by);
}

// Draws a strip of lines.
static void draw_lines_strip(wasm_exec_env_t exec_env, unsigned int  pointsPtr, unsigned int count) {
  const sgp_point* points = copy_from_cart(pointsPtr, count * sizeof(sgp_point));
  sgp_draw_lines_strip(points, count);
}

// Draws triangles in a batch.
static void draw_filled_triangles(wasm_exec_env_t exec_env, unsigned int trianglesPtr, unsigned int count) {
  const sgp_triangle* triangles = copy_from_cart(trianglesPtr, count * sizeof(sgp_triangle));
  sgp_draw_filled_triangles(triangles, count);
}

// Draws a single triangle.
static void draw_filled_triangle(wasm_exec_env_t exec_env, float ax, float ay, float bx, float by, float cx, float cy) {
  sgp_draw_filled_triangle(ax, ay, bx, by, cx, cy);
}

// Draws strip of triangles.
static void draw_filled_triangles_strip(wasm_exec_env_t exec_env, const sgp_point* points, unsigned int count) {
  sgp_draw_filled_triangles_strip(points, count);
}

// Draws a batch of rectangles.
static void draw_filled_rects(wasm_exec_env_t exec_env, unsigned int rectsPtr, unsigned int count) {
  const sgp_rect* rects = copy_from_cart(rectsPtr, count * sizeof(sgp_rect));
  sgp_draw_filled_rects(rects, count);
}

// Draws a single rectangle.
static void draw_filled_rect(wasm_exec_env_t exec_env, float x, float y, float w, float h) {
  sgp_draw_filled_rect(x, y, w, h);
}

// Draws a batch textured rectangle, each from a source region.
static void draw_textured_rects(wasm_exec_env_t exec_env, int channel, unsigned int rectsPtr, unsigned int count) {
  const sgp_textured_rect* rects = copy_from_cart(rectsPtr, count * sizeof(sgp_textured_rect));
  sgp_draw_textured_rects(channel, rects, count);
}

// Draws a single textured rectangle from a source region.
static void draw_textured_rect(wasm_exec_env_t exec_env, int channel, unsigned int dest_rectPtr, unsigned int src_rectPtr) {
  const sgp_rect* dest_rect = copy_from_cart(dest_rectPtr, sizeof(sgp_rect));
  const sgp_rect* src_rect = copy_from_cart(src_rectPtr, sizeof(sgp_rect));
  sgp_draw_textured_rect(channel, *dest_rect, *src_rect);
}

// Draws a single outlined circle.
static void draw_outline_circle(wasm_exec_env_t exec_env, float cx, float cy, float radius) {
  sgp_draw_outline_circle(cx, cy, radius);
}

// Draws a single circle.
static void draw_filled_circle(wasm_exec_env_t exec_env, float cx, float cy, float radius) {
  sgp_draw_filled_circle(cx, cy, radius);
}

///

/*
see this: https://github.com/bytecodealliance/wasm-micro-runtime/blob/main/doc/export_native_api.md
  - $ or * return-vals don't work, use i (and copy out values)
  - * param is a pointer to i32 (since only 4 bytes are copied automatically) unless you can do *~, use i and copy the bytes yourself.
  - use $ params, they work great
*/

static NativeSymbol native_symbols[] = {
  EXPORT_WASM_API_WITH_SIG(test_string_in, "($)"),
  EXPORT_WASM_API_WITH_SIG(test_string_out, "()i"),
  EXPORT_WASM_API_WITH_SIG(test_bytes_in, "(*~)"),
  EXPORT_WASM_API_WITH_SIG(test_bytes_out, "(*)i"),
  EXPORT_WASM_API_WITH_SIG(test_struct_in, "(i)"),
  EXPORT_WASM_API_WITH_SIG(test_struct_out, "()i"),

  EXPORT_WASM_API_WITH_SIG(push_transform, "()"),
  EXPORT_WASM_API_WITH_SIG(pop_transform, "()"),
  EXPORT_WASM_API_WITH_SIG(reset_transform, "()"),
  EXPORT_WASM_API_WITH_SIG(translate, "(ff)"),
  EXPORT_WASM_API_WITH_SIG(rotate, "(f)"),
  EXPORT_WASM_API_WITH_SIG(rotate_at, "(fff)"),
  EXPORT_WASM_API_WITH_SIG(scale, "(ff)"),
  EXPORT_WASM_API_WITH_SIG(scale_at, "(ffff)"),
  EXPORT_WASM_API_WITH_SIG(set_blend_mode, "(i)"),
  EXPORT_WASM_API_WITH_SIG(reset_blend_mode, "()"),
  EXPORT_WASM_API_WITH_SIG(set_color, "(ffff)"),
  EXPORT_WASM_API_WITH_SIG(reset_color, "()"),
  EXPORT_WASM_API_WITH_SIG(set_image, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(unset_image, "(i)"),
  EXPORT_WASM_API_WITH_SIG(reset_image, "(i)"),
  EXPORT_WASM_API_WITH_SIG(viewport, "(iiii)"),
  EXPORT_WASM_API_WITH_SIG(reset_viewport, "()"),
  EXPORT_WASM_API_WITH_SIG(scissor, "(iiii)"),
  EXPORT_WASM_API_WITH_SIG(reset_scissor, "()"),
  EXPORT_WASM_API_WITH_SIG(reset_state, "()"),
  EXPORT_WASM_API_WITH_SIG(clear, "()"),
  EXPORT_WASM_API_WITH_SIG(draw_points, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_point, "(ff)"),
  EXPORT_WASM_API_WITH_SIG(draw_lines, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_line, "(ffff)"),
  EXPORT_WASM_API_WITH_SIG(draw_lines_strip, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_triangles, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_triangle, "(ffffff)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_triangles_strip, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_rects, "(ii)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_rect, "(ffff)"),
  EXPORT_WASM_API_WITH_SIG(draw_textured_rects, "(iii)"),
  EXPORT_WASM_API_WITH_SIG(draw_textured_rect, "(iii)"),
  EXPORT_WASM_API_WITH_SIG(draw_outline_circle, "(fff)"),
  EXPORT_WASM_API_WITH_SIG(draw_filled_circle, "(fff)")
};

int wasm_host_load(char* filename) {
  unsigned char* wasmBytes;

  FILE* file = fopen(filename, "rb");
  if (!file) {
    printf("Failed to open wasm file\n");
    return -1;
  }

  fseek(file, 0, SEEK_END);
  unsigned int bytesRead = ftell(file);
  fseek(file, 0, SEEK_SET);

  wasmBytes = malloc(bytesRead);
  fread(wasmBytes, 1, bytesRead, file);
  fclose(file);

  if (wasmBytes == NULL) {
    fprintf(stderr, "ERROR: Could not read main.wasm\n");
    return -1;
  }

  RuntimeInitArgs init_args;
  memset(&init_args, 0, sizeof(RuntimeInitArgs));

  static char global_heap_buf[8092 * 8];
  init_args.mem_alloc_type = Alloc_With_Pool;
  init_args.mem_alloc_option.pool.heap_buf = global_heap_buf;
  init_args.mem_alloc_option.pool.heap_size = sizeof(global_heap_buf);

  init_args.n_native_symbols = sizeof(native_symbols) / sizeof(NativeSymbol);
  init_args.native_module_name = "null0";
  init_args.native_symbols = native_symbols;

  if (!wasm_runtime_full_init(&init_args)) {
    fprintf(stderr, "ERROR: Init runtime environment failed.\n");
    return -1;
  }

  uint32_t stack_size = 8092, heap_size = 8092;
  unsigned long wasmSize = (unsigned long)bytesRead;
  char error_buf[128];

  error_buf[0] = 0;
  module = wasm_runtime_load(wasmBytes, wasmSize, error_buf, 128);
  if (error_buf[0] != 0) {
    fprintf(stderr, "ERROR: load - %s\n", error_buf);
    return -1;
  }

  error_buf[0] = 0;
  module_inst = wasm_runtime_instantiate(module, stack_size, heap_size, error_buf, 128);
  if (error_buf[0] != 0) {
    fprintf(stderr, "ERROR: instantiate - %s\n", error_buf);
    return -1;
  }

  exec_env = wasm_runtime_create_exec_env(module_inst, stack_size);

  wasm_function_inst_t cart_load = NULL;

  cart_load = wasm_runtime_lookup_function(module_inst, "load");
  cart_update = wasm_runtime_lookup_function(module_inst, "update");
  cart_buttonUp = wasm_runtime_lookup_function(module_inst, "buttonUp");
  cart_buttonDown = wasm_runtime_lookup_function(module_inst, "buttonDown");
  cart_keyUp = wasm_runtime_lookup_function(module_inst, "keyUp");
  cart_keyDown = wasm_runtime_lookup_function(module_inst, "keyDown");

  if (cart_load != NULL) {
    if (!wasm_runtime_call_wasm(exec_env, cart_load, 0, NULL)) {
      // not fatal, but this will help with troubleshooting
      printf("load: %s\n", wasm_runtime_get_exception(module_inst));
    }
  }

  wasm_application_execute_main(module_inst, 0, NULL);

  return 0;
}

void wasm_host_unload() {
  if (cart_unload != NULL) {
    if (!wasm_runtime_call_wasm(exec_env, cart_unload, 0, NULL)) {
      // not fatal, but this will help with troubleshooting
      printf("unload: %s\n", wasm_runtime_get_exception(module_inst));
    }
  }
  if (exec_env != NULL) {
    wasm_runtime_destroy_exec_env(exec_env);
  }
  if (module_inst != NULL) {
    wasm_runtime_deinstantiate(module_inst);
  }
  if (module != NULL) {
    wasm_runtime_unload(module);
  }
  wasm_runtime_destroy();
}

void wasm_host_update() {
  if (cart_update != NULL) {
    func_args[0].kind = WASM_I32;
    func_args[0].of.i32 = null0_millis();
    if (!wasm_runtime_call_wasm_a(exec_env, cart_update, 0, NULL, 1, func_args)) {
      printf("update failed: %s\n", wasm_runtime_get_exception(module_inst));
    }
  }
}
