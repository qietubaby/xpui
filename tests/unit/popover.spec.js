import chai, { expect } from "chai";

// import sinon from 'sinon'
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import { mount } from "@vue/test-utils"; // mount是完整的mount, shallowMount => 只mount一层，你的子组件是假的
import Popover from "@/components/popover/popover.vue";

describe("Popover.vue", () => {
  it("存在", () => {
    expect(Popover).to.exist;
  });

  it("可以设置position", async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: { template: `<button>点我</button>` },
        content: "<div>弹出内容</div>",
      },
      propsData: {
        position: "bottom",
      },
    });

    await wrapper.find("button").trigger("click");
    let classes = wrapper.find(".content-wrapper").classes();
    expect(classes).to.include("position-bottom");
  });

  it("可以设置 trigger", async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: { template: `<button>点我</button>` },
        content: "<div>弹出内容</div>",
      },
      propsData: {
        position: "bottom",
        trigger: "hover",
      },
    });

    expect(wrapper.find(".content-wrapper").element).to.not.exist;
    await wrapper.find(".popover").trigger("mouseenter");
    expect(wrapper.find(".content-wrapper").element).to.exist;
  });
});
