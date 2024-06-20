<template>
  <ul class="border-4 min-h-[500px] bg-[rgba(0,0,0,.2)] flex flex-col gap-[40px] p-[10px]">

    <li v-for="task in tasksData">
      <ul class="border-2 bg-[#fff] text-[18px] break-all p-[10px]">
        <li>id: {{ task._id }}</li>
        <li>Задача: {{ task.name }}</li>
        <li>Описание: {{ task.description }}</li>
        <li>Дата выполнения: {{ task.date_completion ? new Date(task.date_completion).toLocaleDateString() : '' }}</li>
        <li>Метки: {{ task.tags }}</li>
      </ul>
      
      <div class="flex gap-[30px] mt-[5px]">
        <button
          type="button"
          class="text-[14px]"
          @click="openEditTaskPopup(task)"
        >
          Редактировать
        </button>

        <button
          type="button"
          class="text-[14px]"
          @click="deleteTask(task._id)"
        >
          Удалить
        </button>
      </div>
    </li>
    
  </ul>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  export default {
    props: {

      tasksData: {
        type: Array as PropType<Task[] | []>,
        required: true,
      },

      setPopupState: {
        type: Function as PropType<() => void>,
        required: true,
      },

      setTaskData: {
        type: Function as PropType<(task: Task | null) => void>,
        required: true,
      },

      deleteTask: {
        type: Function as PropType<(id: string) => void>,
        required: true,
      }
    },

    methods: {

      // открывает попап и вставляет данные выбранной задачи
      openEditTaskPopup(task: Task): void {
        this.setPopupState();
        this.setTaskData(task);
      },
    },

  }
</script>
