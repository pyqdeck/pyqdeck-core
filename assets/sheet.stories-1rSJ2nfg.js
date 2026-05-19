import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DxRZmAER.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{r as a,t as o}from"./button-D3AKQv-w.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h}from"./sheet-CIgRZlRc.js";import{d as g,i as _,r as v,t as y,u as b}from"./item-BpZJvw8E.js";var x,S,C,w,T,E,D,O,k,A;e((()=>{x=t(n(),1),i(),u(),a(),g(),S={title:`UI/Sheet`,component:h,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Extends the Dialog component to display content that complements the main screen content.
It is commonly used for navigation, filters, or additional details.`}}},argTypes:{side:{control:`select`,options:[`top`,`bottom`,`left`,`right`],description:`The edge of the screen where the sheet will appear.`,table:{category:`Content`,defaultValue:{summary:`right`}}},showCloseButton:{control:`boolean`,description:`Whether to show the close button in the corner.`,table:{category:`Content`,defaultValue:{summary:`true`}}},open:{control:`boolean`,description:`The controlled open state of the sheet.`},onOpenChange:{description:`Event handler called when the open state changes.`,table:{category:`Events`}}},args:{onOpenChange:r()}},C=({side:e,showCloseButton:t,...n})=>(0,x.jsxs)(h,{...n,children:[(0,x.jsx)(c,{asChild:!0,children:(0,x.jsx)(o,{variant:`outline`,children:`View Branch Details`})}),(0,x.jsxs)(p,{side:e,showCloseButton:t,children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(m,{children:`Computer Engineering`}),(0,x.jsx)(l,{children:`Detailed information about the Computer Engineering department and its offerings for the current semester.`})]}),(0,x.jsxs)(`div`,{className:`flex flex-col gap-4 p-4`,children:[(0,x.jsx)(y,{children:(0,x.jsxs)(v,{children:[(0,x.jsx)(b,{children:`Department Code`}),(0,x.jsx)(_,{children:`CE-2024`})]})}),(0,x.jsx)(y,{children:(0,x.jsxs)(v,{children:[(0,x.jsx)(b,{children:`Head of Department`}),(0,x.jsx)(_,{children:`Dr. Sarah Johnson`})]})}),(0,x.jsx)(y,{children:(0,x.jsxs)(v,{children:[(0,x.jsx)(b,{children:`Available Seats`}),(0,x.jsx)(_,{children:`120 / 150`})]})})]}),(0,x.jsxs)(s,{children:[(0,x.jsx)(d,{asChild:!0,children:(0,x.jsx)(o,{variant:`outline`,children:`Close Details`})}),(0,x.jsx)(o,{children:`Edit Branch`})]})]})]}),w={render:C,args:{side:`right`,showCloseButton:!0}},T={render:C,args:{...w.args,side:`left`}},E={render:C,args:{...w.args,side:`top`}},D={render:C,args:{...w.args,side:`bottom`}},O={render:C,args:{...w.args,showCloseButton:!1}},k={render:C,args:{...w.args,open:!0}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    side: 'right',
    showCloseButton: true
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    side: 'left'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    side: 'top'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    side: 'bottom'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    showCloseButton: false
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    open: true
  }
}`,...k.parameters?.docs?.source}}},A=[`Default`,`Left`,`Top`,`Bottom`,`NoCloseButton`,`Controlled`]}))();export{D as Bottom,k as Controlled,w as Default,T as Left,O as NoCloseButton,E as Top,A as __namedExportsOrder,S as default};