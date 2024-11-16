#include <time.h>

#include "sokol_app.h"
#include "sokol_gfx.h"
#include "sokol_glue.h"
#include "sokol_gp.h"
#include "sokol_gp_circle.h"
#include "sokol_log.h"
#include "cvector.h"

typedef struct {
  unsigned int x;
  unsigned int y;
} TestPoint;

static cvector_vector_type(sg_image) images = NULL;

static int null0_millis() {
  struct timespec now;
  timespec_get(&now, TIME_UTC);
  return ((unsigned int)now.tv_sec) * 1000 +
         ((unsigned int)now.tv_nsec) / 1000000;
}

// get an image by id
sg_image null0_get_image(unsigned int id) {
  return images[id];
}

#ifdef EMSCRIPTEN
#include "host_emscripten.h"
#else
#include "host_wamr.h"
#endif
