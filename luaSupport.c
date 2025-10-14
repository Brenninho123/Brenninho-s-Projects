extern "C" {
#include "lua.h"
#include "lauxlib.h"
#include "lualib.h"
}

#include <iostream>
#include  <lua.hpp>

int main() {
    lua_State *L = luaL_newstate();   // create a new Lua state
    luaL_openlibs(L);                 // open Lua standard libraries

    // Load and run a Lua script from a string
    const char* lua_script = R"(
        print("Hello from Lua!")
        function add(a, b)
            return a + b
        end
    )";

    if (luaL_dostring(L, lua_script) != LUA_OK) {
        std::cerr << "Error running Lua script: " << lua_tostring(L, -1) << std::endl;
        lua_pop(L, 1);
    }

    // Call Lua function 'add' from C++
    lua_getglobal(L, "add");
    lua_pushnumber(L, 10);
    lua_pushnumber(L, 20);

    if (lua_pcall(L, 2, 1, 0) != LUA_OK) {
        std::cerr << "Error calling Lua function: " << lua_tostring(L, -1) << std::endl;
        lua_pop(L, 1);
    } else {
        if (lua_isnumber(L, -1)) {
            double result = lua_tonumber(L, -1);
            std::cout << "Result from Lua add function: " << result << std::endl;
        }
        lua_pop(L, 1);
    }

    lua_close(L);
    return 0;
}
