import { Chart as ChartJS } from 'chart.js/auto'
import 'chartjs-adapter-moment'
import annotationPlugin from 'chartjs-plugin-annotation'
import dataLabelsPlugin from 'chartjs-plugin-datalabels'

export default defineNuxtPlugin(() => {
  ChartJS.register(annotationPlugin, dataLabelsPlugin)
})
