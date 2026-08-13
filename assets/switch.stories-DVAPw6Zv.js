import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DSzFGOoK.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{n as a,t as o}from"./label-DFuSkh8b.js";import{n as s,t as c}from"./switch-gwPaSIb3.js";var l,u,d,f,p,m,h,g,_;e((()=>{l=t(n(),1),i(),s(),a(),u={title:`UI/Switch`,component:c,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`The text label for the switch`},size:{control:{type:`select`},options:[`default`,`sm`],description:`The size of the switch`,table:{defaultValue:{summary:`default`}}},disabled:{control:`boolean`,description:`Whether the switch is disabled`,table:{defaultValue:{summary:`false`}}},checked:{control:`boolean`,description:`The controlled checked state of the switch`},defaultChecked:{control:`boolean`,description:`The default checked state when initially rendered`},onCheckedChange:{description:`Event handler called when the checked state changes`}},args:{onCheckedChange:r()}},d=e=>{let t=`switch-${e.size||`default`}-${e.disabled?`disabled`:`enabled`}`;return(0,l.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,l.jsx)(c,{id:t,...e}),(0,l.jsx)(o,{htmlFor:t,className:e.size===`sm`?`text-xs`:``,children:e.label||`Switch`})]})},f={render:d,args:{label:`Show Semester Results`}},p={render:d,args:{size:`sm`,label:`Compact View`}},m={render:d,args:{label:`Notifications Enabled`,defaultChecked:!0}},h={render:d,args:{label:`Automatic Enrollment`,disabled:!0}},g={render:d,args:{label:`Required Course`,disabled:!0,defaultChecked:!0}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Show Semester Results'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    size: 'sm',
    label: 'Compact View'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Notifications Enabled',
    defaultChecked: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Automatic Enrollment',
    disabled: true
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Required Course',
    disabled: true,
    defaultChecked: true
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Small`,`Checked`,`Disabled`,`DisabledChecked`]}))();export{m as Checked,f as Default,h as Disabled,g as DisabledChecked,p as Small,_ as __namedExportsOrder,u as default};