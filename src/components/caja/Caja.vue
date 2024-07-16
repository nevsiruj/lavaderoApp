<template>
  <div v-if="cajaAbierta.isOpen" class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1 class="text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Bienvenido
      </h1>
    </div>

    <div class="flex justify-center min-height-auto">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <RouterLink to="/ListLavadosCaja">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-s-lg hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              fill="white">
              <path
                d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
            </svg>
            Ventas Diarias
          </button>
        </RouterLink>

        <RouterLink to="/listingreso">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]  ">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              fill="white">
              <path
                d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z" />
            </svg>
            Ingresos diarios
          </button>
        </RouterLink>

        <RouterLink to="/listegreso">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-e-lg hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              fill="white">
              <path
                d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
            </svg>
            Egresos diarios
          </button>
        </RouterLink>
      </div>
    </div>

    <div class="relative overflow-x-auto md:flex justify-center">

      <table class="w-full md:w-64 text-sm text-left rtl:text-right text-gray-500 ">
        <tbody>
          <tr class="bg-[#3edfa920]">
            <td class="border-r border-gray-400 px-2 py-1 font-bold w-56">
              Fecha:
            </td>
            <td class="px-2 py-1 w-56">
              {{ new Date().toLocaleDateString() }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Responsable:
            </td>
            <td class="px-2 py-1">{{ cajaAbierta.responsable }}</td>
          </tr>
          <tr class="bg-[#3edfa920]">
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Turno:
            </td>
            <td class="px-2 py-1">{{ cajaAbierta.turno }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Inicial:
            </td>
            <td class="px-2 py-1">
              ${{ cajaAbierta.montoInicial ?? "0.00" }}
            </td>
          </tr>
          <tr class="bg-[#3edfa920]">
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Cantidad:
            </td>
            <td class="px-2 py-1">
              {{ cajaAbierta.cantidadLavados ?? 0 }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Efectivo en Caja:
            </td>
            <td class="px-2 py-1">
              ${{ cajaAbierta.totalImporteLavados ?? 0 }}
            </td>
          </tr>
          <tr class="bg-[#3edfa920]">
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Ingresos:
            </td>
            <td class="px-2 py-1">
              ${{ cajaAbierta.totalImporteIngresos ?? "0.00" }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Egresos:
            </td>
            <td class="px-2 py-1">
              ${{ cajaAbierta.totalImporteEgresos ?? "0.00" }}
            </td>
          </tr>
          <tr class="bg-[#3edfa920]">
            <td class="border-r border-gray-400 px-2 py-1 font-bold">
              Efectivo en caja:
            </td>
            <td class="px-2 py-1">
              ${{ cajaAbierta.efectivoEnCaja ?? "0.00" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="flex justify-center min-height-auto">
      <div class="inline-flex rounded-md shadow-sm " role="group">
        <RouterLink to="/formlavado">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-s-lg hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              fill="white">
              <path
                d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
            </svg>
            Agregar Venta
          </button>
        </RouterLink>

        <RouterLink to="/formingreso">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              fill="white">
              <path
                d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z" />
            </svg>
            Agregar Ingreso
          </button>
        </RouterLink>

        <RouterLink to="/formegreso">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              fill="white">
              <path
                d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
            </svg>
            Agregar egreso
          </button>
        </RouterLink>
        <RouterLink to="/cerrarcaja">
          <button type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-e-lg hover:bg-[#ffe068] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]">
            <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              fill="white">
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
            Cerrar caja
          </button>
        </RouterLink>
      </div>
    </div>
  </div>


  <!----------------------------------------------------------------------->
  <!--<div class="grid grid-cols-5 mt-24 md:mt-32">
    <div class="invisible md:visible"></div>
    <div class="col-span-5 md:col-span-4 p-1">
      <div class="flex justify-center align-items-center">
        <div class="grid grid-cols-1 mb-4 p-0">
          <h1
            class="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            Bienvenido
          </h1>

          <div v-if="cajaAbierta.isOpen">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <RouterLink to="/ListLavadosCaja">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
                >
                  <svg
                    class="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                    />
                  </svg>
                  Ventas Diarias
                </button>
              </RouterLink>

              <RouterLink to="/listingreso">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
                >
                  <svg
                    class="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M32 64C14.3 64 0 49.7 0 32S14.3 0 32 0l96 0c53 0 96 43 96 96l0 306.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 402.7 160 96c0-17.7-14.3-32-32-32L32 64z"
                    />
                  </svg>
                  Ingresos diarios
                </button>
              </RouterLink>

              <RouterLink to="/listegreso">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
                >
                  <svg
                    class="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z"
                    />
                  </svg>
                  Egresos diarios
                </button>
              </RouterLink>
            </div>

            <div class="mt-4">
              <table class="table-auto border border-slate-300">
                <tbody>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Fecha:
                    </td>
                    <td class="px-2 py-1">
                      {{ new Date().toLocaleDateString() }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Responsable:
                    </td>
                    <td class="px-2 py-1">{{ cajaAbierta.responsable }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Turno:
                    </td>
                    <td class="px-2 py-1">{{ cajaAbierta.turno }}</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Inicial:
                    </td>
                    <td class="px-2 py-1">
                      ${{ cajaAbierta.montoInicial ?? "0.00" }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Cantidad:
                    </td>
                    <td class="px-2 py-1">
                      {{ cajaAbierta.cantidadLavados ?? 0 }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Importe:
                    </td>
                    <td class="px-2 py-1">
                      ${{ cajaAbierta.totalImporteLavados ?? 0 }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Ingresos:
                    </td>
                    <td class="px-2 py-1">
                      ${{ cajaAbierta.totalImporteIngresos ?? "0.00" }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Egresos:
                    </td>
                    <td class="px-2 py-1">
                      ${{ cajaAbierta.totalImporteEgresos ?? "0.00" }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="border-r border-gray-400 px-2 py-1 font-bold">
                      Efectivo en caja:
                    </td>
                    <td class="px-2 py-1">
                      ${{ cajaAbierta.efectivoEnCaja ?? "0.00" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="inline-flex rounded-md shadow-sm mt-4" role="group">
            <RouterLink to="/formlavado">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
              >
                <svg
                  class="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  />
                </svg>
                Agregar Venta
              </button>
            </RouterLink>

            <RouterLink to="/formingreso">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
              >
                <svg
                  class="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  />
                </svg>
                Agregar Ingreso
              </button>
            </RouterLink>

            <RouterLink to="/formegreso">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-[#53ebb8] focus:z-10 focus:ring-2 focus:ring-[#53ebb8] focus:text-[#53ebb8]"
              >
                <svg
                  class="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  />
                </svg>
                Agregar egreso
              </button>
            </RouterLink>
          </div>

          <div class="flex justify-center align-items-center mt-3">
            <RouterLink to="/cerrarcaja">
              <button
                type="button"
                class="inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <svg
                  class="w-3 h-3 me-2"
                  aria-hidden="true"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
                Cerrar Caja
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>-->

  <!------------------------------------------------------------------------------>

  <!--<div
    class="panelcontent h-screen flex justify-center items-center overflow-x-hidden"
  >
    <div
      class="card self-center mx-3 w-full md:w-auto shadow-md overflow-hidden"
    >
      <div class="flex flex-col items-center my-4">
        <h3 class="text-3xl font-bold">Bienvenido</h3>
      </div>
      <div v-if="cajaAbierta.isOpen">
        <div
          class="pb-4 w-3/4 mx-auto md:w-full md:flex justify-center my-4 md:gap-6"
        >
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/ListLavadosCaja"
          >
            <i class="fas fa-list-ul mr-1 text-sm"></i>Ventas diaria
          </router-link>
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listingreso"
          >
            <i class="fas fa-list-ul mr-1 text-sm"></i>Ingresos diario
          </router-link>
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listegreso"
          >
            <i class="fas fa-list-ul mr-1 text-sm"></i>Egresos diario
          </router-link>
        </div>
        <div class="flex flex-col items-center mt-6" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold text-sm"
            >No hay cajas abiertas</span
          >
          <router-link class="text-blue-500 mt-3 text-sm" to="/abrircaja"
            >Abrir caja</router-link
          >
        </div>
        <div class="px-4">
          <div class="flex items-center mt-6">
            <strong class="text-sm">Fecha: </strong>
            <h5 class="card-text text-sm">
              {{ new Date().toLocaleDateString() }}
            </h5>
          </div>
          <p class="flex card-text text-sm">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Turno:</strong> {{ cajaAbierta.turno }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Inicial:</strong> ${{ cajaAbierta.montoInicial ?? "0.00" }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Cantidad:</strong> {{ cajaAbierta.cantidadLavados ?? 0 }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Importe:</strong> ${{
              cajaAbierta.totalImporteLavados ?? 0
            }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Ingresos:</strong> ${{
              cajaAbierta.totalImporteIngresos ?? "0.00"
            }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Egresos:</strong> ${{
              cajaAbierta.totalImporteEgresos ?? "0.00"
            }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Efectivo en caja:</strong> ${{
              cajaAbierta.efectivoEnCaja ?? "0.00"
            }}
          </p>
        </div>
      </div>
      <div class="flex p-0 mt-4 gap-1">
        <router-link
          class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formlavado"
        >
          <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar venta
        </router-link>
        <router-link
          class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formingreso"
        >
          <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar ingreso
        </router-link>
        <router-link
          class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formegreso"
        >
          <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar egreso
        </router-link>
        <router-link
          class="py-2 px-2 btn-base text-sm text-red-600 hover:text-red-400 hover:shadow-lg flex-grow"
          to="/cerrarcaja"
        >
          <i class="fa fa-times-circle mr-1 text-sm"></i> Cerrar caja
        </router-link>
      </div>
    </div>
  </div>-->
</template>

<script>
import cajaService from "../../composables/api/cajaService.js";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from '../../store.js'; // Importa el store
import authService from "../../composables/api/authService.js";

export default {
  name: "caja",
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      const currentUser = await authService.getCurrentUser();
      store.role = currentUser.roles[0].toLowerCase()
      if (store.role == 'owner') {
        router.push("/owner/usuariosadmin")
        return
      }
      if (cajaAbierta.value == undefined) {
        router.push("/abrircaja");
      }
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
    };
  },
};
</script>

<style></style>
