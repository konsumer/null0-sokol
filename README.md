This contains a native and web WASI host with sokol for graphics/input/sound. The idea is that you are making something like [null0](https://giuthub.com/natnullgames/null0) where you have a host written in C, and "carts" written in whatever the user wants.

## features

- sokol integration for graphics/sound/input
- Minimal web-host, that runs carts & incldues WASI and any functions you exported from host
- Minimal wamr native host that just runs the wasm
- Build hosts and cart easily (with cmake)
- Test API to show how to pass more advanced values back & forth
- cart filesystem, so you can interact with the cart's files from the host

## building

```
# native host & cart
npm run build

# emscripten host
npm run build:web

# run a server for web-host
npm start
```

## APIs

### Test API

There is a tester API that looks like this:

```c
typedef struct {
  unsigned int x;
  unsigned int y;
} TestPoint;

// send a string to host
void test_string_in(char* str);

// return a string from host
char* test_string_out();

// send some bytes to host
void test_bytes_in(unsigned char* bytes, unsigned int bytesLen);

// return some bytes from host
unsigned char* test_bytes_out(unsigned int* outLen);

// send struct to host
void test_struct_in(TestPoint* point);

// return struct from host
TestPoint* test_struct_out();
```

It's already been setup in cart & hosts, so you can get an idea of how you will need to expose your own API.

### sokol

```c
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
  SGP_BLENDMODE_NONE,     // No blending.
  SGP_BLENDMODE_BLEND,    // Alpha blending.
  SGP_BLENDMODE_ADD,      // Color add.
  SGP_BLENDMODE_MOD,      // Color modulate.
  SGP_BLENDMODE_MUL,      // Color multiply.
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
```


## notes

These might help with setting things up:

- [wamr embed](https://github.com/bytecodealliance/wasm-micro-runtime/blob/main/doc/embed_wamr.md)
- [wamr export_native_api](https://github.com/bytecodealliance/wasm-micro-runtime/blob/main/doc/export_native_api.md)
- [sokol](https://github.com/floooh/sokol)
- [sokol_gp (drawing)](https://github.com/edubart/sokol_gp)
