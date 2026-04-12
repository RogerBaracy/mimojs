const modules = import.meta.glob("@components/**/*.ts");

for (const path in modules) {
  modules[path]();
}
