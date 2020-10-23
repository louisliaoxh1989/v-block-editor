const TextBlockMixin = {
  methods: {
    addNewTextBlock(event, index) {
      /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
      if (event.keyCode == 13) {
        event.preventDefault();

        // 新建text-item到vuex里
        let addBlockInfo = {
          index: index,
          blockItem: {
            type: "text",
            data: {
              text: "",
            },
          },
        };
        
        // 获取光标位置，处理回车时字符串换行问题
        let dom = document.getElementsByTagName("textarea");
        let currInput = dom[index];
        let startPos = currInput.selectionStart;
        if (startPos != this.mValue.text.length) {
          // 如果光标的位置不在最末尾的时候
          // 对光标之后的内容进行截取，并传递给新建的字符串
          addBlockInfo.blockItem.data.text = this.mValue.text.slice(
            startPos,
            this.mValue.text.length
          );
          this.mValue.text = this.mValue.text.slice(0, startPos);
        }

        // 提交数据到vuex
        this.$store.commit("mutationAddCurrentPageBlocks", addBlockInfo);
      }
    },
  },
}
export default TextBlockMixin