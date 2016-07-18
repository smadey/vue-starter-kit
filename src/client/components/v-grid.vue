<template>
  <div class="v-grid">
    <table class="table">
      <colgroup>
        <col v-for="field in fields" :width="field.width" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="field in fields">{{field.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td v-for="field in fields">
            <template v-if="field.component">
              <component :is="field.component"
                :field="field" :item="item" @action="emitAction"></component>
            </template>
            <template v-else>
              {{item[field.name] || field.defaultValue}}
            </template>
          </td>
        </tr>
        <tr v-if="!items.length">
          <td :colspan="fields.length">
            {{emptyMsg}}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页 -->
    <v-pagination v-if="totalCount > 0" :total="pageCount"
      :page="page" @change="changePage"></v-pagination>
  </div>
</template>

<script>
  import vPagination from './v-pagination.vue';

  export default {
    components: {
      vPagination,
    },

    props: {
      fields: {
        type: Array,
        required: true,
      },
      items: Array,
      emptyMsg: String,
      page: 1,
      pageCount: 0,
      totalCount: 0,
    },

    methods: {
      /**
       * 透传 自定义组件单元格 事件
       * @param  {String} actionName 事件名称
       * @param  {Object} actionData 事件数据
       */
      emitAction(actionName, actionData) {
        this.$emit(actionName, actionData);
      },

      /**
       * 翻页
       * @param  {Number} page 页码
       */
      changePage(page) {
        // this.page = page;
        this.$emit('page-changed', page);
      },
    },
  };
</script>
