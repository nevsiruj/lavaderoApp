<template>


<div class="px-3 mt-10">
        <h1 class="text-3xl font-semibold mb-6 " >Servicios</h1>
      <div class="flex flex-col items-center justify-center space-y-2 md:space-y-0 mb-2">
        <div class="flex space-x-2">
          <router-link :to="{ path: '/formServicios' }" class="btn btn-sm btn-success">
            <i class="fas fa-plus-circle mr-1"></i> Agregar Servicio
          </router-link>
            <button class="btn btn-sm btn-primary" @click="fetchServicios">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
        <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2 md:mt-0">
          <i class="fas fa-check-circle mr-1"></i> Actualizados
        </div>
      </div>
      <div class="md:w-fit w-full overflow-x-auto bg-white rounded-lg p-2 shadow-md mx-auto mt-2">
        <table class="min-w-full divide-y divide-gray-200 mt-4">
          <thead class="bg-emerald-300">
            <tr>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Nombre
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Descripción
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Precio
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Tipo Servicio
              </th>
              <th class="px-2 py-2 text-xs text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="servicio in servicios" :key="servicio.id">
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.nombre }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.descripcion }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.precio }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.tipoServicio }}</td>
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl" @click="editarServicio(servicio)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl" @click="deleteServicio(servicio.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

</template>