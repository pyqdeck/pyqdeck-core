import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,o as r,s as i}from"./iframe-DLhurhNv.js";import{n as a,r as o}from"./dist-BvuEP38C.js";import{A as s,L as c,N as l,ct as u,t as d}from"./lucide-react-Bi-kln-I.js";import{r as f,t as p}from"./button-BuQv-gmV.js";import{a as m,i as h,n as g,o as _,r as v,s as y,t as b}from"./empty-DLYVRgW0.js";var x,S,C,w,T,E,D,O,k;e((()=>{x=t(n(),1),o(),d(),y(),f(),i(),S={title:`UI/Empty`,component:b,tags:[`autodocs`],argTypes:{className:{control:`text`,description:`Additional CSS classes for the container`},children:{control:!1,description:`Content of the empty state`}},parameters:{docs:{description:{component:`Empty state component used when there is no content to display.
It provides a consistent layout for icons, titles, descriptions, and call-to-action buttons.`}}}},C=e=>(0,x.jsx)(b,{...e,className:r(`min-h-[400px]`,e.className)}),w={render:C,args:{children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{variant:`icon`,children:(0,x.jsx)(c,{})}),(0,x.jsx)(_,{children:`No universities found`}),(0,x.jsx)(v,{children:`You haven't added any universities to the system yet.`})]}),(0,x.jsx)(g,{children:(0,x.jsxs)(p,{onClick:a(),children:[(0,x.jsx)(l,{className:`mr-2 size-4`}),`Add University`]})})]})}},T={render:C,args:{children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{variant:`icon`,children:(0,x.jsx)(s,{})}),(0,x.jsx)(_,{children:`No results found`}),(0,x.jsx)(v,{children:`We couldn't find any branches matching your search. Try a different term or clear the filter.`})]}),(0,x.jsx)(g,{children:(0,x.jsx)(p,{variant:`outline`,onClick:a(),children:`Clear Filter`})})]})}},E={render:C,args:{children:(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{variant:`icon`,children:(0,x.jsx)(u,{})}),(0,x.jsx)(_,{children:`No papers available`}),(0,x.jsx)(v,{children:`There are no question papers uploaded for this subject yet.`})]})}},D={render:C,args:{children:(0,x.jsxs)(h,{children:[(0,x.jsx)(_,{children:`No notifications`}),(0,x.jsx)(v,{children:`You're all caught up!`})]})}},O={render:C,args:{children:(0,x.jsx)(h,{children:(0,x.jsx)(_,{children:`No entries yet`})})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    children: <>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageOpen />
          </EmptyMedia>
          <EmptyTitle>No universities found</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t added any universities to the system yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={fn()}>
            <Plus className="mr-2 size-4" />
            Add University
          </Button>
        </EmptyContent>
      </>
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    children: <>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find any branches matching your search. Try a
            different term or clear the filter.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" onClick={fn()}>
            Clear Filter
          </Button>
        </EmptyContent>
      </>
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    children: <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestion />
        </EmptyMedia>
        <EmptyTitle>No papers available</EmptyTitle>
        <EmptyDescription>
          There are no question papers uploaded for this subject yet.
        </EmptyDescription>
      </EmptyHeader>
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    children: <EmptyHeader>
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up!</EmptyDescription>
      </EmptyHeader>
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    children: <EmptyHeader>
        <EmptyTitle>No entries yet</EmptyTitle>
      </EmptyHeader>
  }
}`,...O.parameters?.docs?.source}}},k=[`Default`,`SearchResults`,`NoData`,`Simple`,`Minimal`]}))();export{w as Default,O as Minimal,E as NoData,T as SearchResults,D as Simple,k as __namedExportsOrder,S as default};