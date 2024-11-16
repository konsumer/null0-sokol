FetchContent_Declare(stb
  URL https://github.com/nothings/stb/archive/refs/heads/master.zip
)
FetchContent_MakeAvailable(stb)
include_directories(${stb_SOURCE_DIR})
