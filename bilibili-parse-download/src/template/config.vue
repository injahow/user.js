<template>
  <div id="bp_config">
    <div class="config-mark"></div>
    <div class="config-bg">
      <span style="font-size: 20px">
        <b>bilibili视频下载 参数设置</b>
        <b>
          <a href="javascript:;" @click="reset_config()"> [重置] </a>
          <a
            style="text-decoration: underline"
            href="javascript:;"
            @click="show_help()"
            >&lt;通知/帮助&gt;</a
          >
        </b>
      </span>
      <div style="margin: 2% 0">
        <label>请求地址：</label>
        <input
          v-bind:value="config.base_api"
          v-on:input="config.base_api = $event.target.value"
          style="width: 30%"
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <label>请求方式：</label>
        <select
          v-bind:value="config.request_type"
          v-on:input="config.request_type = $event.target.value"
        >
          <option value="auto">自动判断</option>
          <option value="local">本地请求</option>
          <option value="online">远程请求</option></select
        ><br />
        <small>注意：普通使用请勿修改；默认使用混合请求</small>
      </div>
      <div style="margin: 2% 0">
        <label>视频格式：</label>
        <select
          v-bind:value="config.format"
          v-on:input="config.format = $event.target.value"
        >
          <option value="flv">FLV</option>
          <option value="dash">DASH</option>
          <option value="mp4">MP4</option></select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <label>切换CDN：</label>
        <select
          v-bind:value="config.host_key"
          v-on:input="config.host_key = $event.target.value"
        >
          <option
            v-for="e in host_key_options"
            v-bind:value="e.value"
            v-bind:key="e.text"
          >
            {{ e.text }}
          </option></select
        ><br />
        <small
          >注意：仅video支持MP4；建议特殊地区或网络受限时切换（自行选择合适线路）</small
        >
      </div>
      <div style="margin: 2% 0">
        <label>下载方式：</label>
        <select
          v-bind:value="config.download_type"
          v-on:input="config.download_type = $event.target.value"
        >
          <option value="a">URL链接</option>
          <option value="web">Web浏览器</option>
          <option value="blob">Blob请求</option>
          <option value="rpc">RPC接口</option>
          <option value="aria">Aria命令</option></select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <label>AriaNg地址：</label>
        <input
          v-bind:value="config.ariang_host"
          v-on:input="config.ariang_host = $event.target.value"
          style="width: 30%"
        /><br />
        <small
          >提示：前两种方式不会设置文件名；非HTTPS或非本地的RPC域名使用AriaNg下载</small
        >
      </div>
      <div style="margin: 2% 0">
        <label>RPC配置：[ 域名 : 端口 | 密钥 | 保存目录 ]</label><br />
        <input
          v-bind:value="config.rpc_domain"
          v-on:input="config.rpc_domain = $event.target.value"
          style="width: 25%"
        />
        :
        <input
          v-bind:value="config.rpc_port"
          v-on:input="config.rpc_port = $event.target.value"
          style="width: 10%"
        />
        |
        <input
          v-bind:value="config.rpc_token"
          v-on:input="config.rpc_token = $event.target.value"
          placeholder="没有密钥不用填"
          style="width: 15%"
        />
        |
        <input
          v-bind:value="config.rpc_dir"
          v-on:input="config.rpc_dir = $event.target.value"
          placeholder="留空使用默认目录"
          style="width: 20%"
        /><br />
        <small
          >注意：RPC默认使用Motrix（需要安装并运行）下载，其他软件请修改参数</small
        >
      </div>
      <div style="margin: 2% 0">
        <label>强制换源：</label>
        <select
          v-bind:value="config.replace_force"
          v-on:input="config.replace_force = $event.target.value"
        >
          <option value="0">关闭</option>
          <option value="1">开启</option>
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;<label>弹幕速度：</label>
        <input
          v-bind:value="config.danmaku_speed"
          v-on:input="config.danmaku_speed = $event.target.value"
          style="width: 5%"
        />
        s &nbsp;&nbsp;&nbsp;&nbsp;<label>弹幕字号：</label>
        <input
          v-bind:value="config.danmaku_fontsize"
          v-on:input="config.danmaku_fontsize = $event.target.value"
          style="width: 5%"
        />
        px
        <br />
        <small
          >说明：使用请求到的视频地址在DPlayer进行播放；弹幕速度为弹幕滑过DPlayer的时间</small
        >
      </div>
      <div style="margin: 2% 0">
        <label>自动下载：</label>
        <select
          v-bind:value="config.auto_download"
          v-on:input="config.auto_download = $event.target.value"
        >
          <option value="0">关闭</option>
          <option value="1">开启</option></select
        ><br />
        <small>说明：请求地址成功后将自动点击下载视频按钮</small>
      </div>
      <div style="margin: 2% 0">
        <label>授权状态：</label>
        <select id="auth" value="{{config.auth}}" disabled>
          <option value="0">未授权</option>
          <option value="1">已授权</option>
        </select>
        <a class="setting-context" href="javascript:;" @click="show_login()"
          >账号授权</a
        >
        <a class="setting-context" href="javascript:;" @click="show_logout()"
          >取消授权</a
        >
        <a class="setting-context" href="javascript:;" @click="show_login('0')"
          >手动授权</a
        >
        <a
          class="setting-context"
          href="javascript:;"
          @click="show_login_help()"
          >这是什么？</a
        >
      </div>
      <br />
      <div style="text-align: right">
        <button class="setting-button" @click="save_config()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/js/store";
import { check } from "@/js/check";
import { Message, MessageBox } from "@/js/ui/message";
import { scroll } from "@/js/ui/scroll";
import { ajax } from "@/js/utils/ajax";
import { Download } from "@/js/utils/download";
import { player } from "@/js/utils/player";
import { auth } from "@/js/auth";

const { config, hostMap } = require("@/js/config.js");
const default_config = Object.assign({}, config); // 浅拷贝

export default {
  data() {
    let options = [];
    for (const k in hostMap) {
      options.push({
        text: hostMap[k],
        value: k,
      });
    }
    return {
      config,
      host_key_options: options,
      help_clicked: false,
    };
  },
  methods: {
    save_config() {
      const old_config = JSON.parse(store.get("config_str"));
      store.set("config_str", JSON.stringify(config));
      // hide
      $("#bp_config").hide();
      $("#bp_config").css("opacity", 0);
      scroll.show();

      // 判断是否需要重新请求
      for (const key of ["base_api", "format", "auth"]) {
        if (config[key] !== old_config[key]) {
          $("#video_download").hide();
          $("#video_download_2").hide();
          break;
        }
      }
      if (config.host_key !== old_config.host_key) {
        check.refresh();
        $("#video_url").attr("href", "#");
        $("#video_url_2").attr("href", "#");
      }

      // 判断RPC配置情况
      if (config.rpc_domain !== old_config.rpc_domain) {
        if (
          !(
            config.rpc_domain.match("https://") ||
            config.rpc_domain.match(/(localhost|127\.0\.0\.1)/)
          )
        ) {
          MessageBox.alert(
            "检测到当前RPC不是localhost本地接口，即将跳转到AriaNg网页控制台页面；" +
              "请查看控制台RPC接口参数是否正确，第一次加载可能较慢请耐心等待；" +
              "配置好后即可使用脚本进行远程下载<br/>使用期间不用关闭控制台页面！",
            () => {
              Download.open_ariang({
                domain: config.rpc_domain,
                port: config.rpc_port,
                token: config.rpc_token,
              });
            }
          );
        }
      }

      // 更新弹幕设置
      for (const key of ["danmaku_speed", "danmaku_fontsize"]) {
        if (config[key] !== old_config[key]) {
          player.danmaku.config();
          break;
        }
      }

      // ...
    },
    reset_config() {
      for (const key in default_config) {
        if (key === "auth") {
          continue;
        }
        this.config[key] = default_config[key];
      }
    },
    show_help() {
      if (this.help_clicked) {
        Message.miaow();
        return;
      }
      this.help_clicked = true;
      ajax({
        url: `${config.base_api}/auth/v2/?act=help`,
        dataType: "text",
      })
        .then((res) => {
          if (res) {
            MessageBox.alert(res);
          } else {
            Message.warning("获取失败");
          }
        })
        .finally(() => (this.help_clicked = false));
    },
    show_login(auto) {
      auth.login(auto);
    },
    show_logout() {
      auth.logout();
    },
    show_login_help() {
      MessageBox.confirm(
        "进行授权之后将能在远程请求时享有用户账号原有的权益，例如能够请求用户已经付费或承包的番剧，是否需要授权？",
        () => {
          auth.login();
        }
      );
    },
  },
  created() {
    const config_str = store.get("config_str");
    if (config_str) {
      // set config from cache
      try {
        const old_config = JSON.parse(config_str);
        for (const key in old_config) {
          if (Object.hasOwnProperty.call(config, key)) {
            config[key] = old_config[key];
          }
        }
      } catch {
        console.log("初始化脚本配置");
      }
    }
    config.auth = store.get("auth_id") ? "1" : "0";
    store.set("config_str", JSON.stringify(config));

    window.onbeforeunload = () => {
      // todo
      const bp_aria2_window = window.bp_aria2_window;
      if (bp_aria2_window && !bp_aria2_window.closed) {
        bp_aria2_window.close();
      }
    };
  },
};
</script>
<style scoped>
#bp_config {
  opacity: 0;
  display: none;
  position: fixed;
  inset: 0px;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
.config-bg {
  position: absolute;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  z-index: 10001;
}

.config-mark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.setting-button {
  width: 120px;
  height: 40px;
  border-width: 0px;
  border-radius: 3px;
  background: #1e90ff;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 17px;
}

.setting-button:hover {
  background: #5599ff;
}

.setting-context {
  margin: 0 1%;
  color: blue;
}

.setting-context:hover {
  color: red;
}
</style>
