import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,a as r,i,n as a,t as o}from"./iframe-DLJV3Qbr.js";import{n as s,r as c}from"./dist-BvuEP38C.js";import{et as l,t as u}from"./lucide-react-BdVUdILY.js";import{r as d,t as f}from"./button-Cc5dP0bb.js";var p,m,h,g,_,v;e((()=>{p=t(n(),1),c(),u(),r(),d(),m={title:`UI/Tooltip`,component:o,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{open:{control:`boolean`,description:`The open state of the tooltip when it is controlled.`,table:{category:`State`}},defaultOpen:{control:`boolean`,description:`The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.`,table:{category:`State`}},onOpenChange:{description:`Event handler called when the open state of the tooltip changes.`,table:{category:`Events`}},delayDuration:{control:{type:`number`},description:`The duration from when the mouse enters a tooltip trigger until the tooltip opens.`,table:{category:`Appearance`,defaultValue:{summary:`700`}}},side:{control:`select`,options:[`top`,`right`,`bottom`,`left`],description:`The preferred side of the trigger to render against.`,table:{category:`Content`,defaultValue:{summary:`top`}}},sideOffset:{control:`number`,description:`The distance in pixels from the trigger.`,table:{category:`Content`,defaultValue:{summary:`0`}}},align:{control:`select`,options:[`start`,`center`,`end`],description:`The preferred alignment against the trigger.`,table:{category:`Content`,defaultValue:{summary:`center`}}}},args:{onOpenChange:s()}},h={render:({side:e,sideOffset:t,align:n,...r})=>(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsxs)(f,{variant:`outline`,children:[(0,p.jsx)(l,{className:`mr-2 size-4`}),`University Info`]})}),(0,p.jsx)(a,{side:e,sideOffset:t,align:n,children:(0,p.jsx)(`p`,{children:`View detailed information about Mumbai University`})})]})},g={render:({side:e,sideOffset:t,align:n,...r})=>(0,p.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsx)(f,{variant:`outline`,children:`Top`})}),(0,p.jsx)(a,{side:`top`,children:(0,p.jsx)(`p`,{children:`Computer Engineering Branch`})})]}),(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsx)(f,{variant:`outline`,children:`Right`})}),(0,p.jsx)(a,{side:`right`,children:(0,p.jsx)(`p`,{children:`Information Technology Branch`})})]}),(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsx)(f,{variant:`outline`,children:`Bottom`})}),(0,p.jsx)(a,{side:`bottom`,children:(0,p.jsx)(`p`,{children:`Mechanical Engineering Branch`})})]}),(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsx)(f,{variant:`outline`,children:`Left`})}),(0,p.jsx)(a,{side:`left`,children:(0,p.jsx)(`p`,{children:`Civil Engineering Branch`})})]})]})},_={render:({side:e,sideOffset:t,align:n,...r})=>(0,p.jsxs)(o,{...r,children:[(0,p.jsx)(i,{asChild:!0,children:(0,p.jsx)(f,{variant:`outline`,children:`Offset Tooltip`})}),(0,p.jsx)(a,{sideOffset:20,children:(0,p.jsx)(`p`,{children:`Custom offset for branch details`})})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: ({
    side,
    sideOffset,
    align,
    ...args
  }) => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 size-4" />
          University Info
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} align={align}>
        <p>View detailed information about Mumbai University</p>
      </TooltipContent>
    </Tooltip>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: ({
    side,
    sideOffset,
    align,
    ...args
  }) => <div className="flex flex-wrap gap-2">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Computer Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Information Technology Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Mechanical Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Civil Engineering Branch</p>
        </TooltipContent>
      </Tooltip>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: ({
    side,
    sideOffset: _sideOffset,
    align,
    ...args
  }) => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Offset Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={20}>
        <p>Custom offset for branch details</p>
      </TooltipContent>
    </Tooltip>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Sides`,`Offset`]}))();export{h as Default,_ as Offset,g as Sides,v as __namedExportsOrder,m as default};