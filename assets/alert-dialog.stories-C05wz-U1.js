import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-_w7TdDlw.js";import{Ot as r,t as i}from"./lucide-react--sVyDIkY.js";import{r as a,t as o}from"./button-CMptGdcG.js";import{a as s,c,d as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g,u as _}from"./alert-dialog-BTt2Qp6v.js";var v,y,b,x,S,C;e((()=>{v=t(n(),1),l(),a(),i(),y={title:`UI/AlertDialog`,component:g,tags:[`autodocs`],argTypes:{size:{control:{type:`select`},options:[`default`,`sm`],description:`The size of the alert dialog content.`}}},b={args:{size:`default`},render:e=>(0,v.jsxs)(g,{children:[(0,v.jsx)(_,{asChild:!0,children:(0,v.jsx)(o,{variant:`outline`,children:`Delete Account`})}),(0,v.jsxs)(u,{size:e.size,children:[(0,v.jsxs)(h,{children:[(0,v.jsx)(d,{children:`Are you absolutely sure?`}),(0,v.jsx)(s,{children:`This action cannot be undone. This will permanently delete your account and remove your data from our servers.`})]}),(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{children:`Cancel`}),(0,v.jsx)(f,{variant:`destructive`,children:`Delete Account`})]})]})]})},x={args:{size:`default`},render:e=>(0,v.jsxs)(g,{children:[(0,v.jsx)(_,{asChild:!0,children:(0,v.jsx)(o,{variant:`outline`,children:`Deactivate Account`})}),(0,v.jsxs)(u,{size:e.size,children:[(0,v.jsxs)(h,{children:[(0,v.jsx)(c,{children:(0,v.jsx)(r,{})}),(0,v.jsx)(d,{children:`Deactivate account`}),(0,v.jsx)(s,{children:`Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.`})]}),(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{children:`Cancel`}),(0,v.jsx)(f,{variant:`destructive`,children:`Deactivate`})]})]})]})},S={args:{size:`sm`},render:e=>(0,v.jsxs)(g,{children:[(0,v.jsx)(_,{asChild:!0,children:(0,v.jsx)(o,{variant:`outline`,children:`Small Alert Dialog`})}),(0,v.jsxs)(u,{size:e.size,children:[(0,v.jsxs)(h,{children:[(0,v.jsx)(d,{children:`Notice`}),(0,v.jsx)(s,{children:`This is a smaller version of the alert dialog.`})]}),(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{children:`Close`}),(0,v.jsx)(f,{children:`Acknowledge`})]})]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'default'
  },
  render: args => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={args.size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'default'
  },
  render: args => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Deactivate Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={args.size}>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <AlertCircle />
          </AlertDialogMedia>
          <AlertDialogTitle>Deactivate account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm'
  },
  render: args => <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Small Alert Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={args.size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Notice</AlertDialogTitle>
          <AlertDialogDescription>
            This is a smaller version of the alert dialog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Acknowledge</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
}`,...S.parameters?.docs?.source}}},C=[`Default`,`WithMedia`,`Small`]}))();export{b as Default,S as Small,x as WithMedia,C as __namedExportsOrder,y as default};