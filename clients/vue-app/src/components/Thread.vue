<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="sendMessage">
      <md-field>
        <label>{{ $t('message["enter-your-message"]') }}</label>
        <md-textarea v-model="message" md-autogrow></md-textarea>
      </md-field>
      <md-card-actions>
        <md-button type="submit" class="md-primary">{{ $t('message["send-message"]') }}</md-button>
      </md-card-actions>
    </form>

    <md-list>
      <md-list-item :key="message.id" v-for="message in messages">
        <span class="md-list-item-text">
          <vue-markdown>{{ message.content }}</vue-markdown>
        </span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import VueMarkdown from "vue-markdown";

import { fetchWithCredential, pushWithCredential } from "@/lib/fetch";

import socket from "@/socket";

interface IThread {
  descriptor: string;
}

export default Vue.extend({
  name: "ThreadLine",

  components: {
    "vue-markdown": VueMarkdown
  },

  data: () => ({
    descriptor: "",
    messages: [] as Array<{ id: number; descriptor: string; content: string }>,
    message: ""
  }),

  created() {
    this.descriptor = this.$route.params["descriptor"];
    this.getMessages();

    socket.on(
      "new-message",
      (msg: { id: number; descriptor: string; content: string }) => {
        if (msg.descriptor === this.descriptor) {
          this.messages.push(msg);
        }
      }
    );
  },

  methods: {
    async getMessages() {
      const response = await fetchWithCredential(
        this,
        `http://localhost:3000/messages/${this.descriptor}`
      );

      this.messages = await response.json();
    },

    sendMessage() {
      pushWithCredential(
        this,
        `http://localhost:3000/messages/${this.descriptor}`,
        {
          content: this.message
        }
      );

      this.message = "";
    }
  }
});
</script>

<style lang="scss" scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>