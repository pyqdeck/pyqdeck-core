import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-RBDcsRzV.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{a as o,d as s,i as c,l,n as u,o as d,r as f,s as p,t as m}from"./alert-dialog-BijvzGnK.js";function h({university:e,open:t,onOpenChange:n,onDelete:r,loading:i}){return(0,g.jsx)(m,{open:t,onOpenChange:n,children:(0,g.jsxs)(c,{className:`font-roboto border shadow-none`,children:[(0,g.jsxs)(p,{children:[(0,g.jsx)(l,{className:`text-xl font-bold`,children:`Are you absolutely sure?`}),(0,g.jsxs)(o,{children:[`This will permanently delete`,` `,(0,g.jsx)(`span`,{className:`text-foreground font-bold`,children:e?.name}),` `,`and remove all associated data. This action cannot be undone.`]})]}),(0,g.jsxs)(d,{children:[(0,g.jsx)(f,{className:`border font-bold`,children:`Cancel`}),(0,g.jsx)(u,{onClick:e=>{e.preventDefault(),r()},disabled:i,className:`bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold`,children:i?`Deleting...`:`Delete Institution`})]})]})})}var g,_=e((()=>{g=t(n(),1),r(),s(),h.__docgenInfo={description:``,methods:[],displayName:`DeleteUniversityDialogView`}})),v,y,b,x,S;e((()=>{_(),a(),v={title:`Studio/Universities/DeleteUniversityDialog`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{university:{description:`The university object to be deleted`,table:{type:{summary:`object`}}},open:{control:`boolean`,description:`Whether the dialog is open`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Callback called when the open state changes`},onDelete:{description:`Callback called when the delete action is confirmed`},loading:{control:`boolean`,description:`Whether the delete action is in progress`,table:{defaultValue:{summary:`false`}}}}},y={id:`univ-123`,name:`University of Mumbai`},b={args:{university:y,open:!0,onOpenChange:i(),onDelete:i(),loading:!1}},x={args:{...b.args,loading:!0}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    university: mockUniversity,
    open: true,
    onOpenChange: fn(),
    onDelete: fn(),
    loading: false
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    loading: true
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Deleting`]}))();export{b as Default,x as Deleting,S as __namedExportsOrder,v as default};