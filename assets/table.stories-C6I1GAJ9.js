import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DLJV3Qbr.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d}from"./table-C5SC2Z2R.js";var f,p,m,h,g,_,v;e((()=>{f=t(n(),1),o(),p={title:`UI/Table`,component:d,tags:[`autodocs`],argTypes:{className:{control:`text`,description:`Additional CSS classes for the table container`}},parameters:{docs:{description:{component:`A responsive table component for displaying tabular data.`}}}},m=[{name:`Stanford University`,location:`Stanford, CA`,established:`1885`,status:`Private`,endowment:`$36.3 billion`},{name:`Massachusetts Institute of Technology`,location:`Cambridge, MA`,established:`1861`,status:`Private`,endowment:`$23.5 billion`},{name:`University of California, Berkeley`,location:`Berkeley, CA`,established:`1868`,status:`Public`,endowment:`$6.9 billion`},{name:`Harvard University`,location:`Cambridge, MA`,established:`1636`,status:`Private`,endowment:`$50.7 billion`},{name:`California Institute of Technology`,location:`Pasadena, CA`,established:`1891`,status:`Private`,endowment:`$3.5 billion`}],h=e=>(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(l,{children:`A list of top-tier universities in the US.`}),(0,f.jsx)(u,{children:(0,f.jsxs)(i,{children:[(0,f.jsx)(c,{className:`w-[300px]`,children:`University`}),(0,f.jsx)(c,{children:`Location`}),(0,f.jsx)(c,{children:`Established`}),(0,f.jsx)(c,{children:`Status`}),(0,f.jsx)(c,{className:`text-right`,children:`Endowment`})]})}),(0,f.jsx)(s,{children:m.map(e=>(0,f.jsxs)(i,{children:[(0,f.jsx)(a,{className:`font-medium`,children:e.name}),(0,f.jsx)(a,{children:e.location}),(0,f.jsx)(a,{children:e.established}),(0,f.jsx)(a,{children:e.status}),(0,f.jsx)(a,{className:`text-right`,children:e.endowment})]},e.name))}),(0,f.jsx)(r,{children:(0,f.jsxs)(i,{children:[(0,f.jsx)(a,{colSpan:4,children:`Total Endowment (Listed)`}),(0,f.jsx)(a,{className:`text-right`,children:`$120.9 billion`})]})})]}),g={render:h,args:{}},_={render:e=>(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(l,{children:`No universities found.`}),(0,f.jsx)(u,{children:(0,f.jsxs)(i,{children:[(0,f.jsx)(c,{className:`w-[300px]`,children:`University`}),(0,f.jsx)(c,{children:`Location`}),(0,f.jsx)(c,{children:`Established`}),(0,f.jsx)(c,{children:`Status`}),(0,f.jsx)(c,{className:`text-right`,children:`Endowment`})]})}),(0,f.jsx)(s,{children:(0,f.jsx)(i,{children:(0,f.jsx)(a,{colSpan:5,className:`h-24 text-center`,children:`No results.`})})})]}),args:{}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: TableTemplate,
  args: {}
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Table {...args}>
      <TableCaption>No universities found.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">University</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Established</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Endowment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  args: {}
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Empty`]}))();export{g as Default,_ as Empty,v as __namedExportsOrder,p as default};