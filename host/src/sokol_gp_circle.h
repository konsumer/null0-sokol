#include <math.h>
#include "sokol_gp.h"

static const int num_segments = 60;

void sgp_draw_outline_circle(float cx, float cy, float radius) {
  const float step = 2.0f * M_PI / num_segments;
  for (int i = 0; i < num_segments; i++) {
    float a1 = step * i;
    float a2 = step * (i + 1);
    sgp_draw_line(
      cx + cosf(a1) * radius,
      cy + sinf(a1) * radius,
      cx + cosf(a2) * radius,
      cy + sinf(a2) * radius
    );
  }
}

void sgp_draw_filled_circle(float cx, float cy, float radius) {
  const float step = radius / num_segments;
  for (float y = -radius; y <= radius; y += step) {
    float x = sqrtf(radius * radius - y * y);
    sgp_draw_filled_rect(
      cx - x,
      cy + y,
      x * 2,
      step
    );
  }
}
