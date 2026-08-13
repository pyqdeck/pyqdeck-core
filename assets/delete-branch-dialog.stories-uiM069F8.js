import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-oIYMgAzx.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{t as o,u as s}from"./lucide-react-Ck-3X_mw.js";import{a as c,d as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g}from"./alert-dialog-CjIYLKop.js";function _({branch:e,open:t,onOpenChange:n,onDelete:r,loading:i=!1}){return(0,v.jsx)(g,{open:t,onOpenChange:n,children:(0,v.jsxs)(u,{className:`border shadow-none`,children:[(0,v.jsxs)(h,{children:[(0,v.jsx)(`div`,{className:`bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full`,children:(0,v.jsx)(s,{className:`text-destructive h-6 w-6`})}),(0,v.jsx)(d,{className:`font-roboto text-xl font-bold`,children:`Delete Branch?`}),(0,v.jsxs)(c,{className:`font-roboto`,children:[`This will permanently delete`,` `,(0,v.jsx)(`span`,{className:`text-foreground font-bold`,children:e?.name}),` `,`and all its associated semesters, subjects and question papers. This action cannot be undone.`]})]}),(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{className:`font-roboto border font-bold shadow-none`,children:`Cancel`}),(0,v.jsx)(f,{onClick:e=>{e.preventDefault(),r?.()},disabled:i,className:`bg-destructive text-destructive-foreground font-roboto hover:bg-destructive/90 border border-transparent font-bold shadow-none`,children:i?`Deleting...`:`Delete Branch`})]})]})})}var v,y=e((()=>{v=t(n(),1),r(),o(),l(),_.__docgenInfo={description:``,methods:[],displayName:`DeleteBranchDialogView`,props:{loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),b,x,S,C,w,T,E;e((()=>{y(),a(),b={title:`Studio/Academics/DeleteBranchDialog`,component:_,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{branch:{control:`object`,description:`The branch object to be deleted`},open:{control:`boolean`,description:`Whether the dialog is open`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Callback function called when the dialog open state changes`},onDelete:{description:`Callback function called when the delete action is confirmed`},loading:{control:`boolean`,description:`Whether the delete action is in progress`,table:{defaultValue:{summary:`false`}}}},args:{onOpenChange:i(),onDelete:i()}},x={id:`b1`,name:`Computer Engineering`,universityId:`u1`},S={args:{branch:x,open:!0,loading:!1}},C={args:{...S.args,loading:!0}},w={args:{...S.args,open:!1}},T={args:{...S.args,branch:null}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    branch: mockBranch,
    open: true,
    loading: false
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    loading: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    open: false
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    branch: null
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Deleting`,`Closed`,`MissingData`]}))();export{w as Closed,S as Default,C as Deleting,T as MissingData,E as __namedExportsOrder,b as default};