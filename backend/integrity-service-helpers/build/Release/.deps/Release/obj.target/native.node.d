cmd_Release/obj.target/native.node := g++ -shared -pthread -rdynamic -m64  -Wl,-soname=native.node -o Release/obj.target/native.node -Wl,--start-group Release/obj.target/native/binding.o Release/obj.target/node_modules/node-addon-api/src/nothing.a -Wl,--end-group 
