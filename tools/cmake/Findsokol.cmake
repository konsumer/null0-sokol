FetchContent_Declare(sokol
  URL https://github.com/floooh/sokol/archive/refs/heads/master.zip
)
FetchContent_MakeAvailable(sokol)
include_directories(${sokol_SOURCE_DIR})

FetchContent_Declare(sokol_gp
  URL https://github.com/edubart/sokol_gp/archive/refs/heads/master.zip
)
FetchContent_MakeAvailable(sokol_gp)
include_directories(${sokol_gp_SOURCE_DIR})

# TODO: this is just defines for platform. Could it also be done in cmake?
add_library(sokol STATIC ${CMAKE_SOURCE_DIR}/host/src/sokol.c)

if(CMAKE_SYSTEM_NAME STREQUAL Darwin)
  # compile sokol.c as Objective-C
  target_compile_options(sokol PRIVATE -x objective-c)
  target_link_libraries(sokol
        "-framework QuartzCore"
        "-framework Cocoa"
        "-framework MetalKit"
        "-framework Metal"
        "-framework OpenGL"
        "-framework AudioToolbox")
else()
  if (CMAKE_SYSTEM_NAME STREQUAL Linux)
    target_link_libraries(sokol INTERFACE X11 Xi Xcursor GL asound dl m)
    target_link_libraries(sokol PUBLIC Threads::Threads)
  endif()
endif()
