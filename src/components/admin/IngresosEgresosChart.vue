<template>
  <div class="viewport">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import chart from 'chart.js';

export default {
  name: 'IngresosEgresosChart',
  setup() {
    const chartRef = ref(null)
    const state = reactive({
      chart: null,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Ingresos',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [],
          },
          {
            label: 'Egresos',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [],
          },
        ],
      },
    });

    const fetchChartData = () => {
      // Llamada a API para obtener los datos de ingresos y egresos
      // La respuesta debe ser en la forma:
      // {
      //   labels: ['2022-01-01', '2022-01-02', ...],
      //   ingresos: [100, 200, ...],
      //   egresos: [50, 75, ...]
      // }

      const response = {
        labels: [
          '2022-01-01',
          '2022-01-02',
          '2022-01-03',
          '2022-01-04',
          '2022-01-05',
        ],
        ingresos: [100, 200, 300, 400, 500],
        egresos: [50, 75, 100, 125, 150],
      };

      state.data.labels = response.labels;
      state.data.datasets[0].data = response.ingresos;
      state.data.datasets[1].data = response.egresos;
    };

    const createChart = () => {
      if (chartRef.value) {
        const ctx = chartRef.value.getContext('2d');

        state.chart = new Chart(ctx, {
          type: 'line',
          data: state.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      }
    };

    onMounted(() => {
      fetchChartData();
      createChart();
    });

    return { state, chartRef };
  },
};
</script>

<style>
.container-fluid>.row {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>
