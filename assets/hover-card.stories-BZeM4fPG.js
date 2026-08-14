import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,Dt as i,Et as a,Ot as o,Tt as s,o as c,s as l,u}from"./iframe-CrptbQ_u.js";import{n as d,r as f}from"./dist-BvuEP38C.js";import{Nt as p,t as m}from"./lucide-react-BBt6KM8f.js";import{r as h,t as g}from"./button-nBh6mER0.js";import{o as _,r as v,s as y,t as b}from"./avatar-_K5mOQIs.js";function x({...e}){return(0,w.jsx)(i,{"data-slot":`hover-card`,...e})}function S({...e}){return(0,w.jsx)(o,{"data-slot":`hover-card-trigger`,...e})}function C({className:e,align:t=`center`,sideOffset:n=4,...r}){return(0,w.jsx)(a,{"data-slot":`hover-card-portal`,children:(0,w.jsx)(s,{"data-slot":`hover-card-content`,align:t,sideOffset:n,className:c(`bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100`,e),...r})})}var w,T=e((()=>{w=t(n(),1),r(),u(),l(),x.__docgenInfo={description:``,methods:[],displayName:`HoverCard`},S.__docgenInfo={description:``,methods:[],displayName:`HoverCardTrigger`},C.__docgenInfo={description:``,methods:[],displayName:`HoverCardContent`,props:{align:{defaultValue:{value:`'center'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`4`,computed:!1},required:!1}}}})),E,D,O,k,A,j,M;e((()=>{E=t(n(),1),f(),T(),h(),m(),y(),D={title:`UI/HoverCard`,component:x,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A hover card allows users to preview content when hovering over an element.`}}},argTypes:{openDelay:{control:{type:`number`},description:`The duration from when the mouse enters the trigger until the hover card opens.`,table:{defaultValue:{summary:`700`}}},closeDelay:{control:{type:`number`},description:`The duration from when the mouse leaves the trigger or content until the hover card closes.`,table:{defaultValue:{summary:`300`}}},onOpenChange:{description:`Event handler called when the open state of the hover card changes.`}},args:{onOpenChange:d()}},O=e=>(0,E.jsxs)(x,{...e,children:[(0,E.jsx)(S,{asChild:!0,children:(0,E.jsx)(g,{variant:`link`,children:`@nextjs`})}),(0,E.jsx)(C,{className:`w-80`,children:(0,E.jsxs)(`div`,{className:`flex justify-between space-x-4`,children:[(0,E.jsxs)(b,{children:[(0,E.jsx)(_,{src:`https://github.com/vercel.png`}),(0,E.jsx)(v,{children:`VC`})]}),(0,E.jsxs)(`div`,{className:`space-y-1`,children:[(0,E.jsx)(`h4`,{className:`text-sm font-semibold`,children:`@nextjs`}),(0,E.jsx)(`p`,{className:`text-sm`,children:`The React Framework – created and maintained by @vercel.`}),(0,E.jsxs)(`div`,{className:`flex items-center pt-2`,children:[(0,E.jsx)(p,{className:`mr-2 h-4 w-4 opacity-70`}),` `,(0,E.jsx)(`span`,{className:`text-muted-foreground text-xs`,children:`Joined December 2021`})]})]})]})})]}),k={render:O,args:{}},A={render:O,args:{openDelay:0}},j={render:e=>(0,E.jsxs)(x,{...e,children:[(0,E.jsx)(S,{asChild:!0,children:(0,E.jsx)(g,{variant:`outline`,children:`Hover me (Bottom Aligned)`})}),(0,E.jsx)(C,{side:`bottom`,align:`start`,className:`w-80`,children:(0,E.jsxs)(`div`,{className:`flex justify-between space-x-4`,children:[(0,E.jsxs)(b,{children:[(0,E.jsx)(_,{src:`https://github.com/shadcn.png`}),(0,E.jsx)(v,{children:`CN`})]}),(0,E.jsxs)(`div`,{className:`space-y-1`,children:[(0,E.jsx)(`h4`,{className:`text-sm font-semibold`,children:`@shadcn`}),(0,E.jsx)(`p`,{className:`text-sm`,children:`Beautifully designed components built with Radix UI and Tailwind CSS.`}),(0,E.jsxs)(`div`,{className:`flex items-center pt-2`,children:[(0,E.jsx)(p,{className:`mr-2 h-4 w-4 opacity-70`}),` `,(0,E.jsx)(`span`,{className:`text-muted-foreground text-xs`,children:`Joined January 2023`})]})]})]})})]}),args:{openDelay:100}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {}
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    openDelay: 0
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover me (Bottom Aligned)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" align="start" className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm">
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                Joined January 2023
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>,
  args: {
    openDelay: 100
  }
}`,...j.parameters?.docs?.source}}},M=[`Default`,`Instant`,`BottomAligned`]}))();export{j as BottomAligned,k as Default,A as Instant,M as __namedExportsOrder,D as default};