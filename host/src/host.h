#include "sokol_gfx.h"
#include "sokol_gp.h"
#include "sokol_app.h"
#include "sokol_glue.h"
#include "sokol_log.h"

#include <time.h>

typedef struct {
  unsigned int x;
  unsigned int y;
} TestPoint;

static int null0_millis() {
  struct timespec now;
  timespec_get(&now, TIME_UTC);
  return ((unsigned int)now.tv_sec) * 1000 + ((unsigned int)now.tv_nsec) / 1000000;
}

#ifdef EMSCRIPTEN
#include "host_emscripten.h"
#else
#include "host_wamr.h"
#endif
