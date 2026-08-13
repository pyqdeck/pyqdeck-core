import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-Dj9kFMWJ.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{r as a,t as o}from"./button-SXKX9Jta.js";import{n as s,t as c}from"./label-BMGc_qE-.js";import{n as l,t as u}from"./input-C3TQa1ow.js";import{a as d,c as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./dialog-j8uydPZD.js";var y,b,x,S,C,w,T,E;e((()=>{y=t(n(),1),i(),f(),a(),l(),s(),b={title:`UI/Dialog`,component:v,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.`}}},argTypes:{open:{control:`boolean`,description:`The open state of the dialog when it is used as a controlled component.`},onOpenChange:{action:`onOpenChange`,description:`Event handler called when the open state of the dialog changes.`,defaultValue:r()},showCloseButton:{control:`boolean`,description:`Whether to show the close button in the top right corner of the content.`,table:{category:`Content`,defaultValue:{summary:`true`}}},showFooterCloseButton:{control:`boolean`,description:`Whether to show a "Close" button in the footer.`,table:{category:`Footer`,defaultValue:{summary:`false`}}}}},x=({showCloseButton:e,showFooterCloseButton:t,...n})=>(0,y.jsxs)(v,{...n,children:[(0,y.jsx)(_,{asChild:!0,children:(0,y.jsx)(o,{variant:`outline`,children:`Edit Profile`})}),(0,y.jsxs)(m,{className:`sm:max-w-[425px]`,showCloseButton:e,children:[(0,y.jsxs)(d,{children:[(0,y.jsx)(h,{children:`Edit profile`}),(0,y.jsx)(g,{children:`Make changes to your profile here. Click save when you're done.`})]}),(0,y.jsxs)(`div`,{className:`grid gap-4 py-4`,children:[(0,y.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,y.jsx)(c,{htmlFor:`name`,className:`text-right`,children:`Name`}),(0,y.jsx)(u,{id:`name`,defaultValue:`Pedro Duarte`,className:`col-span-3`})]}),(0,y.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,y.jsx)(c,{htmlFor:`username`,className:`text-right`,children:`Username`}),(0,y.jsx)(u,{id:`username`,defaultValue:`@peduarte`,className:`col-span-3`})]})]}),(0,y.jsx)(p,{showCloseButton:t,children:(0,y.jsx)(o,{type:`submit`,children:`Save changes`})})]})]}),S={render:x,args:{showCloseButton:!0,showFooterCloseButton:!1,onOpenChange:r()}},C={render:x,args:{...S.args,showCloseButton:!1}},w={render:x,args:{...S.args,showFooterCloseButton:!0}},T={render:x,args:{...S.args,open:!0}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    showCloseButton: true,
    showFooterCloseButton: false,
    onOpenChange: fn()
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    showCloseButton: false
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    showFooterCloseButton: true
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    open: true
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`NoCloseButton`,`WithFooterCloseButton`,`Controlled`]}))();export{T as Controlled,S as Default,C as NoCloseButton,w as WithFooterCloseButton,E as __namedExportsOrder,b as default};