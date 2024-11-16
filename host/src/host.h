#include "sokol_app.h"
#include "sokol_gfx.h"
#include "sokol_glue.h"
#include "sokol_gp.h"
#include "sokol_gp_circle.h"
#include "sokol_log.h"
#include "cvector.h"

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

typedef struct {
  unsigned int x;
  unsigned int y;
} TestPoint;

static cvector_vector_type(sg_image) images = NULL;

// get an image by id
sg_image null0_get_image(unsigned int id) {
  return images[id];
}

// load image from file, return id
unsigned int null0_load_image(char* filename) {
  int width, height, channels;
  unsigned char* image_data = stbi_load(filename, &width, &height, &channels, 4);
  sg_image_desc img_desc = {
      .width = width,
      .height = height,
      .data.subimage[0][0] = {
          .ptr = image_data,
          .size = width * height * 4
      }
  };
  sg_image image = sg_make_image(&img_desc);
  stbi_image_free(image_data);
  cvector_push_back(images, image);
}

#ifdef EMSCRIPTEN
#include "host_emscripten.h"
#else
#include "host_wamr.h"
#endif
