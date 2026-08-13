import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DSzFGOoK.js";import{g as r,t as i,wt as a}from"./lucide-react-CSsGbmlG.js";import{r as o,t as s}from"./button-BY_Vhp9z.js";import{a as c,i as l,n as u,r as d,t as f}from"./alert-_0X5PF5C.js";var p,m,h,g,_,v;e((()=>{p=t(n(),1),c(),i(),o(),m={title:`UI/Alert`,component:f,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`destructive`]}}},h={args:{variant:`default`},render:e=>(0,p.jsxs)(f,{...e,children:[(0,p.jsx)(r,{className:`h-4 w-4`}),(0,p.jsx)(l,{children:`Heads up!`}),(0,p.jsx)(d,{children:`You can add components to your app using the cli.`})]})},g={args:{variant:`destructive`},render:e=>(0,p.jsxs)(f,{...e,children:[(0,p.jsx)(a,{className:`h-4 w-4`}),(0,p.jsx)(l,{children:`Error`}),(0,p.jsx)(d,{children:`Your session has expired. Please log in again.`})]})},_={args:{variant:`default`},render:e=>(0,p.jsxs)(f,{...e,children:[(0,p.jsx)(r,{className:`h-4 w-4`}),(0,p.jsx)(l,{children:`Update available`}),(0,p.jsx)(d,{children:`A new version of the software is available. Please update now.`}),(0,p.jsx)(u,{children:(0,p.jsx)(s,{variant:`outline`,size:`sm`,children:`Update`})})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive'
  },
  render: args => <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the software is available. Please update now.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Update
        </Button>
      </AlertAction>
    </Alert>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Destructive`,`WithAction`]}))();export{h as Default,g as Destructive,_ as WithAction,v as __namedExportsOrder,m as default};