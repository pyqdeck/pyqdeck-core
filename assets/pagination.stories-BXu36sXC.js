import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-Dj9kFMWJ.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d,t as f}from"./pagination-BBe9m25z.js";var p,m,h,g,_,v,y;e((()=>{p=t(n(),1),i(),o(),m={title:`UI/Pagination`,component:f,tags:[`autodocs`],argTypes:{className:{control:`text`,description:`Additional CSS classes for the pagination container.`,table:{type:{summary:`string`}}}},args:{onClick:r()},parameters:{docs:{description:{component:`Pagination component for navigating through multi-page content.`}}}},h={render:e=>(0,p.jsx)(f,{...e,children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:(0,p.jsx)(d,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`previous`)}})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(1)},children:`1`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,isActive:!0,onClick:t=>{t.preventDefault(),e.onClick(2)},children:`2`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(3)},children:`3`})}),(0,p.jsx)(s,{children:(0,p.jsx)(u,{})}),(0,p.jsx)(s,{children:(0,p.jsx)(l,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`next`)}})})]})})},g={render:e=>(0,p.jsx)(f,{...e,children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:(0,p.jsx)(d,{href:`#`,className:`pointer-events-none opacity-50`,onClick:e=>e.preventDefault()})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,isActive:!0,onClick:t=>{t.preventDefault(),e.onClick(1)},children:`1`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(2)},children:`2`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(3)},children:`3`})}),(0,p.jsx)(s,{children:(0,p.jsx)(u,{})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(10)},children:`10`})}),(0,p.jsx)(s,{children:(0,p.jsx)(l,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`next`)}})})]})})},_={render:e=>(0,p.jsx)(f,{...e,children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:(0,p.jsx)(d,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`previous`)}})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(1)},children:`1`})}),(0,p.jsx)(s,{children:(0,p.jsx)(u,{})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(4)},children:`4`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,isActive:!0,onClick:t=>{t.preventDefault(),e.onClick(5)},children:`5`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(6)},children:`6`})}),(0,p.jsx)(s,{children:(0,p.jsx)(u,{})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(10)},children:`10`})}),(0,p.jsx)(s,{children:(0,p.jsx)(l,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`next`)}})})]})})},v={render:e=>(0,p.jsx)(f,{...e,children:(0,p.jsxs)(c,{children:[(0,p.jsx)(s,{children:(0,p.jsx)(d,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(`previous`)}})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(1)},children:`1`})}),(0,p.jsx)(s,{children:(0,p.jsx)(u,{})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(8)},children:`8`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,onClick:t=>{t.preventDefault(),e.onClick(9)},children:`9`})}),(0,p.jsx)(s,{children:(0,p.jsx)(a,{href:`#`,isActive:!0,onClick:t=>{t.preventDefault(),e.onClick(10)},children:`10`})}),(0,p.jsx)(s,{children:(0,p.jsx)(l,{href:`#`,className:`pointer-events-none opacity-50`,onClick:e=>e.preventDefault()})})]})})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={e => {
          e.preventDefault();
          args.onClick('previous');
        }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(1);
        }}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={e => {
          e.preventDefault();
          args.onClick(2);
        }}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(3);
        }}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={e => {
          e.preventDefault();
          args.onClick('next');
        }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="pointer-events-none opacity-50" onClick={e => e.preventDefault()} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={e => {
          e.preventDefault();
          args.onClick(1);
        }}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(2);
        }}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(3);
        }}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(10);
        }}>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={e => {
          e.preventDefault();
          args.onClick('next');
        }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={e => {
          e.preventDefault();
          args.onClick('previous');
        }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(1);
        }}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(4);
        }}>
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={e => {
          e.preventDefault();
          args.onClick(5);
        }}>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(6);
        }}>
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(10);
        }}>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={e => {
          e.preventDefault();
          args.onClick('next');
        }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={e => {
          e.preventDefault();
          args.onClick('previous');
        }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(1);
        }}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(8);
        }}>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={e => {
          e.preventDefault();
          args.onClick(9);
        }}>
            9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={e => {
          e.preventDefault();
          args.onClick(10);
        }}>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="pointer-events-none opacity-50" onClick={e => e.preventDefault()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...v.parameters?.docs?.source}}},y=[`Default`,`FirstPage`,`MiddlePage`,`LastPage`]}))();export{h as Default,g as FirstPage,v as LastPage,_ as MiddlePage,y as __namedExportsOrder,m as default};