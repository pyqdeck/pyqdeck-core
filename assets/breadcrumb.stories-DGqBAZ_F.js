import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,Sr as i,o as a,s as o,u as s}from"./iframe-BRAiZSiM.js";import{S as c,Tt as l,lt as u,t as d}from"./lucide-react-DofwPGTf.js";function f({className:e,...t}){return(0,y.jsx)(`nav`,{"aria-label":`breadcrumb`,"data-slot":`breadcrumb`,className:a(e),...t})}function p({className:e,...t}){return(0,y.jsx)(`ol`,{"data-slot":`breadcrumb-list`,className:a(`text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words`,e),...t})}function m({className:e,...t}){return(0,y.jsx)(`li`,{"data-slot":`breadcrumb-item`,className:a(`inline-flex items-center gap-1`,e),...t})}function h({asChild:e,className:t,...n}){return(0,y.jsx)(e?i:`a`,{"data-slot":`breadcrumb-link`,className:a(`hover:text-foreground transition-colors`,t),...n})}function g({className:e,...t}){return(0,y.jsx)(`span`,{"data-slot":`breadcrumb-page`,role:`link`,"aria-disabled":`true`,"aria-current":`page`,className:a(`text-foreground font-normal`,e),...t})}function _({children:e,className:t,...n}){return(0,y.jsx)(`li`,{"data-slot":`breadcrumb-separator`,role:`presentation`,"aria-hidden":`true`,className:a(`[&>svg]:size-3.5`,t),...n,children:e??(0,y.jsx)(l,{})})}function v({className:e,...t}){return(0,y.jsxs)(`span`,{"data-slot":`breadcrumb-ellipsis`,role:`presentation`,"aria-hidden":`true`,className:a(`flex size-5 items-center justify-center [&>svg]:size-4`,e),...t,children:[(0,y.jsx)(u,{}),(0,y.jsx)(`span`,{className:`sr-only`,children:`More`})]})}var y,b=e((()=>{y=t(n(),1),r(),s(),o(),d(),f.__docgenInfo={description:``,methods:[],displayName:`Breadcrumb`},p.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbList`},m.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbItem`},h.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbLink`},g.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbPage`},_.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbSeparator`},v.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbEllipsis`}})),x,S,C,w,T,E,D;e((()=>{x=t(n(),1),r(),b(),d(),S={title:`UI/Breadcrumb`,component:f,tags:[`autodocs`],subcomponents:{BreadcrumbList:p,BreadcrumbItem:m,BreadcrumbLink:h,BreadcrumbPage:g,BreadcrumbSeparator:_,BreadcrumbEllipsis:v}},C={render:e=>(0,x.jsx)(f,{...e,children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/`,children:`Home`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/docs/components`,children:`Components`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(g,{children:`Breadcrumb`})})]})})},w={render:e=>(0,x.jsx)(f,{...e,children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/`,children:`Home`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(v,{})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/docs/components`,children:`Components`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(g,{children:`Breadcrumb`})})]})})},T={render:e=>(0,x.jsx)(f,{...e,children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/`,children:`Home`})}),(0,x.jsx)(_,{children:(0,x.jsx)(c,{})}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/docs/components`,children:`Components`})}),(0,x.jsx)(_,{children:(0,x.jsx)(c,{})}),(0,x.jsx)(m,{children:(0,x.jsx)(g,{children:`Breadcrumb`})})]})})},E={render:e=>(0,x.jsx)(f,{...e,children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/`,children:`Home`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(v,{})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/docs/components`,children:`Components`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`/docs/components/breadcrumb`,children:`Breadcrumb`})}),(0,x.jsx)(_,{}),(0,x.jsx)(m,{children:(0,x.jsx)(g,{children:`Default`})})]})})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components/breadcrumb">
            Breadcrumb
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Default</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...E.parameters?.docs?.source}}},D=[`Default`,`WithEllipsis`,`CustomSeparator`,`Collapsed`]}))();export{E as Collapsed,T as CustomSeparator,C as Default,w as WithEllipsis,D as __namedExportsOrder,S as default};