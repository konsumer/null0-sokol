// this sets up the sokol interface
// TODO: incorprate this into build

#define SOKOL_IMPL
#if defined(_MSC_VER)
#define SOKOL_D3D11
#elif defined(__EMSCRIPTEN__)
#define SOKOL_GLES3
#elif defined(__APPLE__)
// NOTE: on macOS, sokol.c is compiled explicitly as ObjC
//#define SOKOL_GLCORE
#define SOKOL_METAL
#else
#define SOKOL_GLCORE
#endif
#include "sokol_gfx.h"
#include "sokol_gp.h"
#include "sokol_app.h"
#include "sokol_glue.h"
#include "sokol_log.h"
