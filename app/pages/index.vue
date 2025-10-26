<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <UDashboardSidebar :default-size="20">
      <Editor></Editor>
    </UDashboardSidebar>
    <div class="flex-1">
      <Svg></Svg>
    </div>
  </div>
</template>
