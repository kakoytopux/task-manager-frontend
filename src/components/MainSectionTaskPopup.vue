<template>
  <div class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[rgba(0,0,0,.4)]">
    <div class="bg-[#fff] w-[600px] h-[600px] flex flex-col items-center py-[20px] px-[80px] rounded-[10px]">

      <div class="flex items-center w-full justify-between">
        <h2 class="text-[25px]">
          Задачник
        </h2>

        <button
          type="button"
          @click="closePopup"
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
          </svg>
        </button>
      </div>

      <form
        class="flex flex-col w-full mt-[30px] gap-[40px]"
        @submit.prevent="onSubmit"
      >
        <input
          type="text"
          placeholder="Название задачи"
          required
          class="text-[16px] px-[5px] border-2 h-[60px] rounded-[7px]"
          v-model="fieldsValue.name"
        />

        <input
          type="text"
          placeholder="Описание задачи"
          required
          class="text-[16px] px-[5px] border-2 h-[60px] rounded-[7px]"
          v-model="fieldsValue.description"
        />

        <input
          type="date"
          placeholder="Дата выполнения задачи"
          class="text-[16px] px-[5px] border-2 h-[60px] rounded-[7px]"
          v-model="fieldsValue.date_completion"
        />

        <input
          type="text"
          placeholder="Метки"
          class="text-[16px] px-[5px] border-2 h-[60px] rounded-[7px]"
          v-model="fieldsValue.tags"
        />

        <button
          type="submit"
          class="bg-[#000] text-[#fff] w-[200px] h-[50px] self-center rounded-[7px]"
        >
          {{ getTextSubmitBtn }}
        </button>
      </form>

    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  export default {
    props: {

      setPopupState: {
        type: Function as PropType<() => void>,
        required: true
      },
      
      createTask: {
        type: Function as PropType<(data: {[key:string]: string}) => void>,
        required: true
      },

      editTask: {
        type: Function as PropType<(data: {[key:string]: string}, id: string) => void>,
        required: true
      },

      taskData: Object as PropType<Task | null>,

      setTaskData: {
        type: Function as PropType<(task: Task | null) => void>,
        required: true,
      },
    },

    computed: {

      // название кнопки в зависимости от состояния
      getTextSubmitBtn(): string {
        return this.taskData ? 'Редактировать задачу' : 'Создать задачу';
      }
    },

    data() {
      return {
        fieldsValue: {} as {[key: string]: string},
      }
    },

    methods: {

      // отправляет данные
      onSubmit(): void {
        if (this.taskData) {
          this.editTask(this.fieldsValue, this.taskData._id);
        } else {
          this.createTask(this.fieldsValue);
        }
        
        this.closePopup();
      },

      closePopup(): void {

        // очищает все поля ввод
        this.fieldsValue = {}

        // закрывает попап
        this.setPopupState();

        // удаляет данные одной задачи
        this.setTaskData(null);
      },
    },

    mounted() {
      const fields = this.fieldsValue;
      const taskData = this.taskData;

      // вставляет данные в поля ввода из полученной задачи
      if (taskData) {
        fields.name = taskData.name;
        fields.description = taskData.description;

        // меняет timestamp в нормальный формат
        fields.date_completion = taskData.date_completion ?
        new Date(taskData.date_completion || '').toISOString().slice(0, 10) : '';

        fields.tags = taskData.tags.toString() || '';
      }
    }
    
  }
</script>
