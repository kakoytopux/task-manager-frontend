<template>
  <section class="flex flex-col items-center mt-[100px]">
    <div class="max-w-[700px] w-full flex flex-col gap-[20px]">

      <button
        type="button"
        class="self-end text-[17px] font-[600] border-4 w-[200px] h-[60px]"
        @click="setPopupState"
      >
        Создать задачу
      </button>
      
      <MainSectionTasks
        :tasksData="tasksData"
        :setPopupState="setPopupState"
        :setTaskData="setTaskData"
        :deleteTask="deleteTask"
      />

    </div>
  </section>

  <MainSectionTaskPopup
    v-if="popupState"
    :setPopupState="setPopupState"
    :createTask="createTask"
    :editTask="editTask"
    :taskData="taskData"
    :setTaskData="setTaskData"
  />

</template>

<script lang="ts">
  import { taskApi } from '@/utils/api/TaskApi';
  import MainSectionTaskPopup from './MainSectionTaskPopup.vue';
  import MainSectionTasks from './MainSectionTasks.vue';

  export default {
    components: {
      MainSectionTaskPopup,
      MainSectionTasks
    },

    data() {
      return {

        // состояние попапа
        popupState: false as boolean,

        // все задачи
        tasksData: [] as Task[],

        // одна выбранная задача
        taskData: null as Task | null,
      }
    },

    methods: {

      // меняет состояние попапа
      setPopupState(): void {
        this.popupState = !this.popupState;
      },

      // запрос для создания задачи
      createTask(data: {[key:string]: string}): void {
        taskApi.createTask(data)
        .then((res: Task) => this.tasksData.push(res))
        .catch((err: Error) => console.error(err));
      },

      // получение всех задач
      getAllTasks(): void {
        taskApi.getAllTasks()
        .then((res: Task[]) => this.tasksData = res)
        .catch((err: Error) => console.error(err));
      },

      // редактирование задачи
      editTask(data: {[key:string]: string}, id: string): void {
        taskApi.editTask(data, id)
        .then((res: Task) => {
          this.tasksData.find((task: Task, index: number) => {
            if (task._id === res._id) {
              this.tasksData[index] = res;
            }
          });
        })
        .catch((err: Error) => console.error(err));
      },

      // удаление задачи
      deleteTask(id: string): void {
        taskApi.deleteTask(id)
        .then((res: Task) => this.tasksData = this.tasksData.filter((task: Task) => task._id !== res._id))
        .catch((err: Error) => console.error(err));
      },

      // установка данных выбранной задачи
      setTaskData(task: Task | null): void {
        this.taskData = task;
      },
      
    },

    mounted() {
      this.getAllTasks();
    },

  }
</script>
