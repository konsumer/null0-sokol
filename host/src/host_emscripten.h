#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include "emscripten.h"

int wasm_host_load(char* filename) { return 0; }

void wasm_host_unload() {}

EM_JS(void, wasm_host_update, (), {
  if (Module?.cart?.exports?.update) {
    Module.cart.exports.update(Date.now());
  }
});

EM_JS(
    void,
    _wasm_host_copy_from_cart,
    (unsigned int cartPtr, void* hostPtr, unsigned int size),
    {
      let i = 0;
      const mem = new Uint8Array(
          Module.cart.exports.memory.buffer.slice(cartPtr, cartPtr + size)
      );
      for (i = 0; i < size; i++) {
        Module.HEAPU8[hostPtr + i] = mem[i];
      }
    }
);

// copy a pointer from cart to host
void* copy_from_cart(unsigned int cartPtr, unsigned int size) {
  void* out = malloc(size);
  _wasm_host_copy_from_cart(cartPtr, out, size);
  return out;
}

EM_JS(int, cart_strlen, (unsigned int cartPtr), {
  const MAX_STR_LEN = 1024;
  let len = 0;
  const mem = new Uint8Array(
      Module.cart.exports.memory.buffer.slice(cartPtr, cartPtr + MAX_STR_LEN)
  );
  for (len = 0; len < MAX_STR_LEN; len++) {
    if (mem[len] === 0) {
      break;
    }
  }
  if (len === MAX_STR_LEN) {
    return -1;
  }
  return len;
});

// copy a pointer to a string from cart to host
char* copy_from_cart_string(unsigned int cartPtr) {
  int len = cart_strlen(cartPtr);
  char* out = NULL;
  if (len) {
    out = copy_from_cart(cartPtr, len);
  }
  return out;
}

// copy from a host pointer to cart, return cart pointer
EM_JS(int, copy_to_cart, (void* hostPtr, unsigned int size), {
  const cartPtr = Module.cart.exports.malloc(size);
  const cartBytes = Module.HEAPU8.slice(hostPtr, hostPtr + size);
  const mem = new Uint8Array(Module.cart.exports.memory.buffer);
  mem.set(cartBytes, cartPtr);
  return cartPtr;
});

/// API

// send a string to host
void EMSCRIPTEN_KEEPALIVE test_string_in(unsigned int sPtr) {
  char* str = copy_from_cart_string(sPtr);
  printf("host: test_string_in - %s\n", str);
}

// return a string from host
unsigned int EMSCRIPTEN_KEEPALIVE test_string_out() {
  char* ret = "hello!";
  return copy_to_cart(ret, strlen(ret) + 1);
}

// send some bytes to host
void EMSCRIPTEN_KEEPALIVE
test_bytes_in(unsigned int bytesPtr, unsigned int bytesLen) {
  unsigned char* bytes = copy_from_cart(bytesPtr, bytesLen);
  printf(
      "host: test_bytes_in (%u) - %u %u %u %u\n", bytesLen, bytes[0], bytes[1],
      bytes[2], bytes[3]
  );
}

// return some bytes from host
unsigned int EMSCRIPTEN_KEEPALIVE test_bytes_out(unsigned int outLenPtr) {
  unsigned int outLen = 4;

  unsigned char bytes[] = {0, 1, 2, 3};
  return copy_to_cart(bytes, outLen);
}

// send struct to host
void EMSCRIPTEN_KEEPALIVE test_struct_in(unsigned int pointPntr) {
  TestPoint* point = copy_from_cart(pointPntr, sizeof(TestPoint));
  printf("host: test_struct_in - %ux%u\n", point->x, point->y);
}

// return struct from host
unsigned int EMSCRIPTEN_KEEPALIVE test_struct_out() {
  TestPoint point = {.x = 200, .y = 100};
  return copy_to_cart(&point, sizeof(point));
}

/// SOKOL

// Saves current transform matrix, to be restored later with a pop.
void EMSCRIPTEN_KEEPALIVE push_transform(void) { sgp_push_transform(); }

// Restore transform matrix to the same value of the last push.
void EMSCRIPTEN_KEEPALIVE pop_transform(void) { sgp_pop_transform(); }

// Resets the transform matrix to identity (no transform).
void EMSCRIPTEN_KEEPALIVE reset_transform(void) { sgp_reset_transform(); }

// Translates the 2D coordinate space.
void EMSCRIPTEN_KEEPALIVE translate(float x, float y) { sgp_translate(x, y); }

// Rotates the 2D coordinate space around the origin.
void EMSCRIPTEN_KEEPALIVE rotate(float theta) { sgp_rotate(theta); }

// Rotates the 2D coordinate space around a point.
void EMSCRIPTEN_KEEPALIVE rotate_at(float theta, float x, float y) {
  sgp_rotate_at(theta, x, y);
}

// Scales the 2D coordinate space around the origin.
void EMSCRIPTEN_KEEPALIVE scale(float sx, float sy) { sgp_scale(sx, sy); }

// Scales the 2D coordinate space around a point.
void EMSCRIPTEN_KEEPALIVE scale_at(float sx, float sy, float x, float y) {
  sgp_scale_at(sx, sy, x, y);
}

// Sets current blend mode.
void EMSCRIPTEN_KEEPALIVE set_blend_mode(sgp_blend_mode blend_mode) {
  sgp_set_blend_mode(blend_mode);
}

// Resets current blend mode to default (no blending).
void EMSCRIPTEN_KEEPALIVE reset_blend_mode(void) { sgp_reset_blend_mode(); }

// Sets current color modulation.
void EMSCRIPTEN_KEEPALIVE set_color(float r, float g, float b, float a) {
  sgp_set_color(r, g, b, a);
}

// Resets current color modulation to default (white).
void EMSCRIPTEN_KEEPALIVE reset_color(void) { sgp_reset_color(); }

// Sets current bound image in a texture channel.
void EMSCRIPTEN_KEEPALIVE set_image(int channel, unsigned int image) {
  sgp_set_image(channel, null0_get_image(image));
}

// Remove current bound image in a texture channel (no texture).
void EMSCRIPTEN_KEEPALIVE unset_image(int channel) { sgp_unset_image(channel); }

// Resets current bound image in a texture channel to default (white texture).
void EMSCRIPTEN_KEEPALIVE reset_image(int channel) { sgp_reset_image(channel); }

// Sets the screen area to draw into.
void EMSCRIPTEN_KEEPALIVE viewport(int x, int y, int w, int h) {
  sgp_viewport(x, y, w, h);
}

// Reset viewport to default values (0, 0, width, height).
void EMSCRIPTEN_KEEPALIVE reset_viewport(void) { sgp_reset_viewport(); }

// Set clip rectangle in the viewport.
void EMSCRIPTEN_KEEPALIVE scissor(int x, int y, int w, int h) {
  sgp_scissor(x, y, w, h);
}

// Resets clip rectangle to default (viewport bounds).
void EMSCRIPTEN_KEEPALIVE reset_scissor(void) { sgp_reset_scissor(); }

// Reset all state to default values.
void EMSCRIPTEN_KEEPALIVE reset_state(void) { sgp_reset_state(); }

// Clears the current viewport using the current state color.
void EMSCRIPTEN_KEEPALIVE clear(void) { sgp_clear(); }

// Draws points in a batch.
void EMSCRIPTEN_KEEPALIVE
draw_points(const sgp_point* points, unsigned int count) {
  sgp_draw_points(points, count);
}

// Draws a single point.
void EMSCRIPTEN_KEEPALIVE draw_point(float x, float y) { sgp_draw_point(x, y); }

// Draws lines in a batch.
void EMSCRIPTEN_KEEPALIVE
draw_lines(const sgp_line* lines, unsigned int count) {
  sgp_draw_lines(lines, count);
}

// Draws a single line.
void EMSCRIPTEN_KEEPALIVE draw_line(float ax, float ay, float bx, float by) {
  sgp_draw_line(ax, ay, bx, by);
}

// Draws a strip of lines.
void EMSCRIPTEN_KEEPALIVE
draw_lines_strip(const sgp_point* points, unsigned int count) {
  sgp_draw_lines_strip(points, count);
}

// Draws triangles in a batch.
void EMSCRIPTEN_KEEPALIVE
draw_filled_triangles(const sgp_triangle* triangles, unsigned int count) {
  sgp_draw_filled_triangles(triangles, count);
}

// Draws a single triangle.
void EMSCRIPTEN_KEEPALIVE draw_filled_triangle(
    float ax,
    float ay,
    float bx,
    float by,
    float cx,
    float cy
) {
  sgp_draw_filled_triangle(ax, ay, bx, by, cx, cy);
}

// Draws strip of triangles.
void EMSCRIPTEN_KEEPALIVE
draw_filled_triangles_strip(const sgp_point* points, unsigned int count) {
  sgp_draw_filled_triangles_strip(points, count);
}

// Draws a batch of rectangles.
void EMSCRIPTEN_KEEPALIVE
draw_filled_rects(const sgp_rect* rects, unsigned int count) {
  sgp_draw_filled_rects(rects, count);
}

// Draws a single rectangle.
void EMSCRIPTEN_KEEPALIVE draw_filled_rect(float x, float y, float w, float h) {
  sgp_draw_filled_rect(x, y, w, h);
}

// Draws a batch textured rectangle, each from a source region.
void EMSCRIPTEN_KEEPALIVE draw_textured_rects(
    int channel,
    const sgp_textured_rect* rects,
    unsigned int count
) {
  sgp_draw_textured_rects(channel, rects, count);
}

// Draws a single textured rectangle from a source region.
void EMSCRIPTEN_KEEPALIVE
draw_textured_rect(int channel, sgp_rect dest_rect, sgp_rect src_rect) {
  sgp_draw_textured_rect(channel, dest_rect, src_rect);
}

// Draws a single outlined circle.
void EMSCRIPTEN_KEEPALIVE
draw_outline_circle(float cx, float cy, float radius) {
  sgp_draw_outline_circle(cx, cy, radius);
}

// Draws a single circle.
void EMSCRIPTEN_KEEPALIVE draw_filled_circle(float cx, float cy, float radius) {
  sgp_draw_filled_circle(cx, cy, radius);
}

///
