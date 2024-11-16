#include <stdlib.h>

#define NULL0_EXPORT(n) __attribute__((export_name(n)))
#define NULL0_IMPORT(n) __attribute__((import_module("null0"), import_name(n)))

// mem-management

NULL0_EXPORT("malloc")
void* _null0_malloc(size_t size) {
  return malloc(size);
}

NULL0_EXPORT("free")
void _null0_free(void* ptr) {
  free(ptr);
}

//// Cart callbacks

NULL0_EXPORT("update")
void update(int time);
NULL0_EXPORT("unload")
void unload();
NULL0_EXPORT("buttonUp")
void buttonUp(unsigned int button);
NULL0_EXPORT("buttonDown")
void buttonDown(unsigned int button);
NULL0_EXPORT("keyUp")
void keyUp(unsigned int key);
NULL0_EXPORT("keyDown")
void keyDown(unsigned int key);
NULL0_EXPORT("load")
void load();

// these are some testers for arg/ret passing

typedef struct {
  unsigned int x;
  unsigned int y;
} TestPoint;

// send a string to host
NULL0_IMPORT("test_string_in")
void test_string_in(char* str);

// return a string from host
NULL0_IMPORT("test_string_out")
char* test_string_out();

// send some bytes to host
NULL0_IMPORT("test_bytes_in")
void test_bytes_in(unsigned char* bytes, unsigned int bytesLen);

// return some bytes from host
NULL0_IMPORT("test_bytes_out")
unsigned char* test_bytes_out(unsigned int* outLen);

// send struct to host
NULL0_IMPORT("test_struct_in")
void test_struct_in(TestPoint* point);

// return struct from host
NULL0_IMPORT("test_struct_out")
TestPoint* test_struct_out();

typedef struct {
  float x, y;
} Vec2;

typedef Vec2 Point;
typedef Vec2 Dimensions;

typedef struct {
  Point a, b;
} Line;

typedef struct {
  Point a, b, c;
} Triangle;

typedef struct {
  float x, y, w, h;
} Rect;

typedef struct {
  Rect dst;
  Rect src;
} TexturedRect;

typedef enum {
  BLENDMODE_NONE,     // No blending.
  BLENDMODE_BLEND,    // Alpha blending.
  BLENDMODE_ADD,      // Color add.
  BLENDMODE_MOD,      // Color modulate.
  BLENDMODE_MUL,      // Color multiply.
} BlendMode;

// Saves current transform matrix, to be restored later with a pop.
void push_transform(void);

// Restore transform matrix to the same value of the last push.
void pop_transform(void);

// Resets the transform matrix to identity (no transform).
void reset_transform(void);

// Translates the 2D coordinate space.
void translate(float x, float y);

// Rotates the 2D coordinate space around the origin.
void rotate(float theta);

// Rotates the 2D coordinate space around a point.
void rotate_at(float theta, float x, float y);

// Scales the 2D coordinate space around the origin.
void scale(float sx, float sy);

// Scales the 2D coordinate space around a point.
void scale_at(float sx, float sy, float x, float y);


// Sets current blend mode.
void set_blend_mode(BlendMode blend_mode);

// Resets current blend mode to default (no blending).
void reset_blend_mode(void);

// Sets current color modulation.
void set_color(float r, float g, float b, float a);

// Resets current color modulation to default (white).
void reset_color(void);

// Sets current bound image in a texture channel.
void set_image(int channel, unsigned int image);

// Remove current bound image in a texture channel (no texture).
void unset_image(int channel);

// Resets current bound image in a texture channel to default (white texture).
void reset_image(int channel);


// Sets the screen area to draw into.
void viewport(int x, int y, int w, int h);

// Reset viewport to default values (0, 0, width, height).
void reset_viewport(void);

// Set clip rectangle in the viewport.
void scissor(int x, int y, int w, int h);

// Resets clip rectangle to default (viewport bounds).
void reset_scissor(void);

// Reset all state to default values.
void reset_state(void);


// Clears the current viewport using the current state color.
void clear(void);

// Draws points in a batch.
void draw_points(const Point* points, uint32_t count);

// Draws a single point.
void draw_point(float x, float y);

// Draws lines in a batch.
void draw_lines(const Line* lines, uint32_t count);

// Draws a single line.
void draw_line(float ax, float ay, float bx, float by);

// Draws a strip of lines.
void draw_lines_strip(const Point* points, uint32_t count);

// Draws triangles in a batch.
void draw_filled_triangles(const Triangle* triangles, uint32_t count);

// Draws a single triangle.
void draw_filled_triangle(float ax, float ay, float bx, float by, float cx, float cy);

// Draws strip of triangles.
void draw_filled_triangles_strip(const Point* points, uint32_t count);

// Draws a batch of rectangles.
void draw_filled_rects(const Rect* rects, uint32_t count);

// Draws a single rectangle.
void draw_filled_rect(float x, float y, float w, float h);

// Draws a batch textured rectangle, each from a source region.
void draw_textured_rects(int channel, const TexturedRect* rects, uint32_t count);

// Draws a single textured rectangle from a source region.
void draw_textured_rect(int channel, Rect dest_rect, Rect src_rect);

// Draws a single outlined circle.
void draw_outline_circle(float cx, float cy, float radius);

// Draws a single circle.
void draw_filled_circle(float cx, float cy, float radius);
