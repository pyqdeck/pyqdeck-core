import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DxRZmAER.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{n as a,t as o}from"./label-iHvZhp7B.js";import{n as s,t as c}from"./checkbox-B_3Y1pFz.js";var l,u,d,f,p,m,h,g;e((()=>{l=t(n(),1),i(),s(),a(),u={title:`UI/Checkbox`,component:c,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{checked:{control:`boolean`,description:`The controlled checked state of the checkbox`},defaultChecked:{control:`boolean`,description:`The default checked state of the checkbox`},disabled:{control:`boolean`,description:`When true, prevents the user from interacting with the checkbox`,table:{defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`When true, indicates that the user must check the checkbox before the owning form can be submitted`,table:{defaultValue:{summary:`false`}}},onCheckedChange:{description:`Event handler called when the checked state of the checkbox changes`,action:`checked change`}},args:{onCheckedChange:r()}},d={render:e=>(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:`terms`,...e}),(0,l.jsx)(o,{htmlFor:`terms`,children:`I accept the university's terms of service`})]})},f={args:{defaultChecked:!0},render:e=>(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:`checked`,...e}),(0,l.jsx)(o,{htmlFor:`checked`,children:`Mark paper as reviewed`})]})},p={args:{checked:`indeterminate`},render:e=>(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:`indeterminate`,...e}),(0,l.jsx)(o,{htmlFor:`indeterminate`,children:`Select all modules`})]})},m={args:{disabled:!0},render:e=>(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:`disabled`,...e}),(0,l.jsx)(o,{htmlFor:`disabled`,children:`This option is currently unavailable`})]})},h={args:{required:!0},render:e=>(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:`required`,...e}),(0,l.jsxs)(o,{htmlFor:`required`,children:[`Agree to privacy policy `,(0,l.jsx)(`span`,{className:`text-destructive`,children:`*`})]})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">
        I accept the university&apos;s terms of service
      </Label>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Mark paper as reviewed</Label>
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    checked: 'indeterminate'
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="indeterminate" {...args} />
      <Label htmlFor="indeterminate">Select all modules</Label>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="disabled" {...args} />
      <Label htmlFor="disabled">This option is currently unavailable</Label>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="required" {...args} />
      <Label htmlFor="required">
        Agree to privacy policy <span className="text-destructive">*</span>
      </Label>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Checked`,`Indeterminate`,`Disabled`,`Required`]}))();export{f as Checked,d as Default,m as Disabled,p as Indeterminate,h as Required,g as __namedExportsOrder,u as default};