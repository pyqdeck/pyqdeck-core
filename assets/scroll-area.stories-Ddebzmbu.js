import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-CrptbQ_u.js";import{n as r,t as i}from"./scroll-area-D7CGz1vm.js";import{n as a,t as o}from"./separator-CgSAg7Ut.js";var s,c,l,u,d,f,p,m,h;e((()=>{s=t(n(),1),r(),a(),c={title:`UI/ScrollArea`,component:i,tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`vertical`,`horizontal`,`both`],description:`The orientation of the scroll area`,table:{defaultValue:{summary:`vertical`}}},type:{control:`select`,options:[`auto`,`always`,`scroll`,`hover`],description:`The type of scroll area`,table:{defaultValue:{summary:`hover`}}},scrollHideDelay:{control:`number`,description:`The delay in milliseconds before the scrollbar is hidden`,table:{defaultValue:{summary:`600`}}},dir:{control:`select`,options:[`ltr`,`rtl`],description:`The reading direction of the scroll area`,table:{defaultValue:{summary:`ltr`}}}}},l=[`Computer Engineering`,`Information Technology`,`Electronics and Communication`,`Mechanical Engineering`,`Civil Engineering`,`Electrical Engineering`,`Chemical Engineering`,`Aerospace Engineering`,`Biotechnology Engineering`,`Automobile Engineering`,`Mechatronics Engineering`,`Data Science and AI`],u=e=>(0,s.jsx)(i,{...e,className:`h-72 w-64 rounded-md border`,children:(0,s.jsxs)(`div`,{className:`p-4`,children:[(0,s.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Branches`}),l.map(e=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`text-sm`,children:e}),(0,s.jsx)(o,{className:`my-2`})]},e))]})}),d={render:u,args:{orientation:`vertical`}},f={render:e=>(0,s.jsx)(i,{...e,className:`w-96 rounded-md border whitespace-nowrap`,children:(0,s.jsx)(`div`,{className:`flex w-max space-x-4 p-4`,children:l.map(e=>(0,s.jsx)(`div`,{className:`bg-muted flex h-24 w-40 shrink-0 items-center justify-center rounded-md text-sm font-medium`,children:e},e))})}),args:{orientation:`horizontal`}},p={render:e=>(0,s.jsx)(i,{...e,className:`h-72 w-96 rounded-md border`,children:(0,s.jsx)(`div`,{className:`grid w-[800px] grid-cols-4 gap-4 p-4`,children:Array.from({length:24}).map((e,t)=>(0,s.jsxs)(`div`,{className:`bg-muted flex h-32 items-center justify-center rounded-md text-sm font-medium`,children:[`Item `,t+1]},t))})}),args:{orientation:`both`}},m={render:u,args:{orientation:`vertical`,type:`always`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: VerticalTemplate,
  args: {
    orientation: 'vertical'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <ScrollArea {...args} className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {branches.map(branch => <div key={branch} className="bg-muted flex h-24 w-40 shrink-0 items-center justify-center rounded-md text-sm font-medium">
            {branch}
          </div>)}
      </div>
    </ScrollArea>,
  args: {
    orientation: 'horizontal'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <ScrollArea {...args} className="h-72 w-96 rounded-md border">
      <div className="grid w-[800px] grid-cols-4 gap-4 p-4">
        {Array.from({
        length: 24
      }).map((_, i) => <div key={i} className="bg-muted flex h-32 items-center justify-center rounded-md text-sm font-medium">
            Item {i + 1}
          </div>)}
      </div>
    </ScrollArea>,
  args: {
    orientation: 'both'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: VerticalTemplate,
  args: {
    orientation: 'vertical',
    type: 'always'
  }
}`,...m.parameters?.docs?.source}}},h=[`Vertical`,`Horizontal`,`Both`,`AlwaysVisible`]}))();export{m as AlwaysVisible,p as Both,f as Horizontal,d as Vertical,h as __namedExportsOrder,c as default};