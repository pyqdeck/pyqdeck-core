import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,o as r,s as i}from"./iframe-oIYMgAzx.js";function a({className:e,...t}){return(0,s.jsx)(`kbd`,{"data-slot":`kbd`,className:r(`bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none [&_svg:not([class*='size-'])]:size-3`,e),...t})}function o({className:e,...t}){return(0,s.jsx)(`kbd`,{"data-slot":`kbd-group`,className:r(`inline-flex items-center gap-1`,e),...t})}var s,c=e((()=>{s=t(n(),1),i(),a.__docgenInfo={description:``,methods:[],displayName:`Kbd`},o.__docgenInfo={description:``,methods:[],displayName:`KbdGroup`}})),l,u,d,f,p,m,h,g,_,v,y;e((()=>{l=t(n(),1),c(),u={title:`UI/Kbd`,component:a,tags:[`autodocs`],argTypes:{children:{control:`text`,description:`The content to be displayed within the keyboard key.`},className:{control:`text`,description:`Additional CSS classes for custom styling.`}},parameters:{docs:{description:{component:`The Kbd component is used to display keyboard inputs and combinations.`}}}},d={args:{children:`⌘`}},f={args:{children:`⌘`}},p={args:{children:`⇧`}},m={args:{children:`↵`}},h={args:{children:`K`}},g={render:()=>(0,l.jsxs)(o,{children:[(0,l.jsx)(a,{children:`⌘`}),(0,l.jsx)(a,{children:`K`})]})},_={render:()=>(0,l.jsxs)(o,{children:[(0,l.jsx)(a,{children:`⇧`}),(0,l.jsx)(a,{children:`⌘`}),(0,l.jsx)(a,{children:`P`})]})},v={render:e=>(0,l.jsxs)(`div`,{"data-slot":`tooltip-content`,className:`bg-primary text-primary-foreground rounded-md p-2 text-sm`,children:[`Press `,(0,l.jsx)(a,{...e}),` to search`]}),args:{children:`⌘K`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: '⌘'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: '⌘'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: '⇧'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: '↵'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'K'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <KbdGroup>
      <Kbd>⇧</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <div data-slot="tooltip-content" className="bg-primary text-primary-foreground rounded-md p-2 text-sm">
      Press <Kbd {...args} /> to search
    </div>,
  args: {
    children: '⌘K'
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`Command`,`Shift`,`Enter`,`Letter`,`Combination`,`ComplexCombination`,`WithinTooltip`]}))();export{g as Combination,f as Command,_ as ComplexCombination,d as Default,m as Enter,h as Letter,p as Shift,v as WithinTooltip,y as __namedExportsOrder,u as default};