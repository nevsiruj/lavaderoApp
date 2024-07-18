<template>
  <div class="viewport w-fit mx-auto">
    <h1 class="text-3xl font-semibold mb-6">Dashboard de Ventas</h1>
    <form>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block mb-2">Fecha inicio:</label>
          <input
            type="date"
            class="form-control border-emerald-300"
            v-model="fechaInicio"
          />
        </div>
        <div>
          <label class="block mb-2">Fecha fin:</label>
          <input
            type="date"
            class="form-control border-emerald-300 px-4"
            v-model="fechaFin"
          />
        </div>
        <div class="flex items-end">
          <button
            type="button"
            class="mt-4 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
            @click="filtrar"
          >
            Filtrar
          </button>
        </div>
      </div>
      <ul class="nav nav-tabs mb-2 border-none" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link rounded-md active text-black hover:bg-emerald-400"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Home
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link rounded-md text-black hover:bg-emerald-400"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            E/R
          </button>
        </li>
      </ul>
    </form>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div> //Esta linea Comentada


    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabindex="0"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="bg-white rounded-lg p-4 shadow"
            id="boxSelect"
            @click="mostrarDetalle('totalLavados')"
          >
            <h2 class="text-xl font-semibold">Cantidad Ventas</h2>
            <p class="text-3xl">{{ totalLavados }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Ingresos</h2>
            <p class="text-3xl">{{ totalIngresos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Egresos</h2>
            <p class="text-3xl">{{ totalEgresos }}</p>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabindex="0"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalGastos()"
          >
            <h2 class="text-xl font-semibold">Gastos</h2>
            <p class="text-3xl">{{ totalGastos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Beneficio Neto</h2>
            <p class="text-3xl">{{ beneficioNeto }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarVentanaDetalle }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ kpiSeleccionado }}
          </h3>
          <div class="mt-5">
            <p class="text-gray-700">{{ detalleKPI }}</p>
          </div>

          
          <div class="bg-white shadow-md rounded-md p-6">
            <canvas id="chart"></canvas>
          </div>
          
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="mostrarVentanaDetalle = false"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
  Ventana emergente para el detalle del KPI //Comentario
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarImportesTotales }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="overflow-x-scroll">
            <table
              class="table table-responsive table-hover table-striped table-sm overflow-x-auto"
            >
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Responsable</th>
                  <th>Descripción</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lavado in lavados" :key="lavado.id">
                  <td>
                    {{ lavado.fecha }}
                  </td>
                  <td>{{ lavado.responsable }}</td>
                  <td>{{ lavado.descripcion }}</td>
                  <td>{{ Number(lavado.importe) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right" @click="mostrarTotalFacturado()">
            <h2 class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalFacturado }}$
            </h2>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="mostrarImportesTotales = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarGastos }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <table
            class="table table-responsive table-hover table-striped table-sm"
          >
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gasto in gastos" :key="gasto.id">
                <td>
                  {{ gasto.fechaRegistro }}
                </td>
                <td>{{ gasto.descripcion }}</td>
                <td>{{ Number(gasto.importe) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <p class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalGastos }}$
            </p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
              @click="mostrarGastos = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



///////////////////////////////////////////////Nuevo

<template>
  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl "
      >
        Dashboard de Ventas
      </h1>
    </div>
    <div
      class="flex flex-row justify-center align-center min-height-auto gap-3 px-2"
    >
      <!--Fechas y flitro-->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input
            type="date"
            v-model="fechaInicio"
            class="form-control block px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            v-model="fechaFin"
            class="form-control block px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="button"
            @click="filtrar"
            class="focus:outline-none text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Filtrar
          </button>
        </div>
      </div>
      <!--Fechas y flitro-->
    </div>
    <!--Tabs-->
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        <li class="me-2" role="presentation">
          <button
            class="inline-block p-4 text-[#3edfa9] border-b-2 rounded-t-lg"
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Home 
          </button>
        </li>
        <li class="me-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 text-[#3edfa9] hover:text-green-600 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            ER
          </button>
        </li>
        
      </ul>
    </div>
    <div id="default-tab-content">
      <div
        class="hidden p-4 rounded-lg"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="bg-white rounded-lg p-4 shadow"
            id="boxSelect"
            @click="mostrarDetalle('totalLavados')"
          >
            <h2 class="text-xl font-semibold">Cantidad Ventas</h2>
            <p class="text-3xl">{{ totalLavados }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Ingresos</h2>
            <p class="text-3xl">{{ totalIngresos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Egresos</h2>
            <p class="text-3xl">{{ totalEgresos }}</p>
          </div>
        </div>
      </div>
      <div
        class="hidden p-4 rounded-lg"
        id="dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalGastos()"
          >
            <h2 class="text-xl font-semibold">Gastos</h2>
            <p class="text-3xl">{{ totalGastos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Beneficio Neto</h2>
            <p class="text-3xl">{{ beneficioNeto }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--Tabs-->
  </div>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarVentanaDetalle }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ kpiSeleccionado }}
          </h3>
          <div class="mt-5">
            <p class="text-gray-700">{{ detalleKPI }}</p>
          </div>

          
          <div class="bg-white shadow-md rounded-md p-6">
            <canvas id="chart"></canvas>
          </div>
          
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="mostrarVentanaDetalle = false"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Ventana emergente para el detalle del KPI //Comentario-->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarImportesTotales }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="overflow-x-scroll">
            <table
              class="table table-responsive table-hover table-striped table-sm overflow-x-auto"
            >
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Responsable</th>
                  <th>Descripción</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lavado in lavados" :key="lavado.id">
                  <td>
                    {{ lavado.fecha }}
                  </td>
                  <td>{{ lavado.responsable }}</td>
                  <td>{{ lavado.descripcion }}</td>
                  <td>{{ Number(lavado.importe) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right" @click="mostrarTotalFacturado()">
            <h2 class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalFacturado }}$
            </h2>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068] "
              @click="mostrarImportesTotales = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarGastos }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <table
            class="table table-responsive table-hover table-striped table-sm"
          >
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gasto in gastos" :key="gasto.id">
                <td>
                  {{ gasto.fechaRegistro }}
                </td>
                <td>{{ gasto.descripcion }}</td>
                <td>{{ Number(gasto.importe) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <p class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalGastos }}$
            </p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068] "
              @click="mostrarGastos = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>