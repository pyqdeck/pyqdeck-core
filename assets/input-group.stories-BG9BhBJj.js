import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DLJV3Qbr.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{M as a,W as o,j as s,qt as c,t as l}from"./lucide-react-BdVUdILY.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./input-group-Cjwzz_UO.js";var _,v,y,b,x,S,C,w,T,E,D;e((()=>{_=t(n(),1),i(),h(),l(),v={title:`UI/InputGroup`,component:g,tags:[`autodocs`],argTypes:{className:{control:`text`,description:`Additional CSS classes for the input group.`}},parameters:{docs:{description:{component:`A flexible input group component that allows combining inputs with icons, buttons, and text addons.
Supports both inline and block layouts.`}}}},y={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(a,{className:`size-4`})}),(0,_.jsx)(d,{placeholder:`Search everything...`})]})},b={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(o,{className:`size-4`})}),(0,_.jsx)(d,{placeholder:`Email address`})]})},x={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(d,{placeholder:`Search...`}),(0,_.jsx)(f,{align:`inline-end`,children:(0,_.jsxs)(m,{onClick:r(),children:[(0,_.jsx)(a,{className:`size-4`}),`Search`]})})]})},S={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(u,{children:`https://`})}),(0,_.jsx)(d,{placeholder:`example.com`}),(0,_.jsx)(f,{align:`inline-end`,children:(0,_.jsx)(m,{variant:`default`,onClick:r(),children:(0,_.jsx)(s,{className:`size-4`})})})]})},C={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{align:`block-start`,children:(0,_.jsx)(u,{children:`Message`})}),(0,_.jsx)(p,{placeholder:`Type your message here...`}),(0,_.jsx)(f,{align:`block-end`,children:(0,_.jsxs)(m,{onClick:r(),children:[(0,_.jsx)(s,{className:`size-4`}),`Send Message`]})})]})},w={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(o,{className:`size-4`})}),(0,_.jsx)(d,{placeholder:`Email address`,disabled:!0})]})},T={render:e=>(0,_.jsxs)(g,{...e,className:`max-w-sm`,children:[(0,_.jsx)(f,{children:(0,_.jsx)(c,{className:`size-4`})}),(0,_.jsx)(d,{placeholder:`Notifications`,"aria-invalid":`true`})]})},E={render:e=>(0,_.jsxs)(`div`,{className:`flex w-full max-w-sm flex-col gap-8`,children:[(0,_.jsxs)(g,{...e,children:[(0,_.jsx)(f,{align:`block-start`,children:(0,_.jsx)(u,{children:`Top Label`})}),(0,_.jsx)(d,{placeholder:`Input with block-start addon`})]}),(0,_.jsxs)(g,{...e,children:[(0,_.jsx)(d,{placeholder:`Input with block-end addon`}),(0,_.jsx)(f,{align:`block-end`,children:(0,_.jsx)(u,{children:`Bottom Helper Text`})})]}),(0,_.jsxs)(g,{...e,children:[(0,_.jsx)(f,{align:`block-start`,children:(0,_.jsx)(u,{children:`Full Layout`})}),(0,_.jsx)(d,{placeholder:`Everything combined`}),(0,_.jsx)(f,{align:`block-end`,children:(0,_.jsxs)(`div`,{className:`flex w-full items-center justify-between`,children:[(0,_.jsx)(u,{children:`Characters: 0`}),(0,_.jsx)(m,{variant:`outline`,size:`xs`,children:`Action`})]})})]})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search everything..." />
    </InputGroup>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Mail className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email address" />
    </InputGroup>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={fn()}>
          <Search className="size-4" />
          Search
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="default" onClick={fn()}>
          <Send className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon align="block-start">
        <InputGroupText>Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Type your message here..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton onClick={fn()}>
          <Send className="size-4" />
          Send Message
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Mail className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Email address" disabled />
    </InputGroup>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <InputGroup {...args} className="max-w-sm">
      <InputGroupAddon>
        <Bell className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Notifications" aria-invalid="true" />
    </InputGroup>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex w-full max-w-sm flex-col gap-8">
      <InputGroup {...args}>
        <InputGroupAddon align="block-start">
          <InputGroupText>Top Label</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Input with block-start addon" />
      </InputGroup>

      <InputGroup {...args}>
        <InputGroupInput placeholder="Input with block-end addon" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Bottom Helper Text</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup {...args}>
        <InputGroupAddon align="block-start">
          <InputGroupText>Full Layout</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Everything combined" />
        <InputGroupAddon align="block-end">
          <div className="flex w-full items-center justify-between">
            <InputGroupText>Characters: 0</InputGroupText>
            <InputGroupButton variant="outline" size="xs">
              Action
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
}`,...E.parameters?.docs?.source}}},D=[`Default`,`WithIcon`,`WithButton`,`WithPrefixAndSuffix`,`WithTextarea`,`Disabled`,`Invalid`,`BlockLayout`]}))();export{E as BlockLayout,y as Default,w as Disabled,T as Invalid,x as WithButton,b as WithIcon,S as WithPrefixAndSuffix,C as WithTextarea,D as __namedExportsOrder,v as default};