#include <math.h>
#include <stdio.h>

#include "null0.h"

static const int square_size = 150;

Rect dest_rect;
Rect src_rect;

void update(int time) {
  set_color(0.1f, 0.1f, 0.1f, 1.0f);
  clear();

  // purple
  set_color(0.4f, 0.4f, 1.0f, 1.0f);
  draw_filled_circle(10, 10, 10);

  // lightgreen
  set_color(0.5f, 1.0f, 0.3f, 1.0f);
  draw_filled_circle(310, 10, 10);

  // orange
  set_color(1.0f, 0.5f, 0.3f, 1.0f);
  draw_filled_circle(10, 230, 10);

  // yellow
  set_color(0.8f, 0.8f, 0.0f, 1.0f);
  draw_filled_circle(310, 230, 10);

  float t = (float)time * 0.001;

  float r = sinf(t) * 0.5 + 0.5, g = cosf(t) * 0.5 + 0.5;
  set_color(r, g, 0.3f, 1.0f);

  rotate_at(t, 160, 120);
  draw_filled_rect(160 - (square_size / 2), 120 - (square_size / 2), square_size, square_size);
}

void load() {
  printf("cart: Hello from cart load.\n");

  test_string_in("hi");
  printf("cart: test_string_out - %s\n", test_string_out());

  unsigned char i[4] = {1, 2, 3, 4};
  test_bytes_in(i, 4);

  unsigned int len = 0;
  unsigned char* bytes = test_bytes_out(&len);
  printf(
      "cart: test_bytes_out (%u) - %u %u %u %u\n", len, bytes[0], bytes[1],
      bytes[2], bytes[3]
  );

  TestPoint p = {100, 200};
  test_struct_in(&p);

  TestPoint* p2 = test_struct_out();
  printf("cart: test_struct_out - %ux%u\n", p2->x, p2->y);
}

int main() {
  return 0;
}
