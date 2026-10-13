(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const steps = [
    { id: 'overview', title: '客户需求与推荐', sub: '需求、场景与付费顾虑', icon: 'scan-search', sections: ['overview'] },
    { id: 'materials', title: '品牌内容与AI制作', sub: '把卖点转为内容与素材', icon: 'panels-top-left', sections: ['materials'] },
    { id: 'campaigns', title: '体验与现场服务', sub: '线上引导、线下讲解与答疑', icon: 'route', sections: ['campaigns'] },
    { id: 'channels', title: '渠道推广与测试', sub: '品牌账号、A/B测试与投放', icon: 'network', sections: ['channels', 'content-test'] },
    { id: 'research', title: 'AI看板与转化复盘', sub: '观察转化并反馈下一轮', icon: 'chart-no-axes-combined', sections: ['sop', 'results', 'research'] }
  ];
  const sections = Object.fromEntries(steps.flatMap(step => step.sections).map(id => [id, document.getElementById(id)]));
  const main = $('main');
  const workspace = document.createElement('div');
  workspace.className = 'workspace report';
  workspace.id = 'workspace';
  workspace.innerHTML = `
    <aside class="workspace-rail">
      <p class="rail-label">PROJECT WORKFLOW <span>05 STEPS</span></p>
      <div class="workflow-tabs" role="tablist" aria-label="项目工作流程" aria-orientation="vertical">
        ${steps.map((step, index) => `<button type="button" role="tab" id="step-${step.id}" aria-controls="panel-${step.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-step="${index}"><span class="step-number">0${index + 1}</span><span class="step-text"><strong>${step.title}</strong><small>${step.sub}</small></span>${icon(step.icon)}</button>`).join('')}
      </div>
      <div class="rail-ownership"><span>我的职责</span><p>客户需求 · 产品价值介绍<br>品牌账号 · AI内容制作<br>体验服务 · 推广转化复盘</p></div>
      <p class="rail-note">内部用户明细与推广合作信息不公开。</p>
    </aside>
    <div class="workspace-body">
      <div class="workspace-toolbar"><span class="workspace-breadcrumb"><b>01</b> / 05 <span>${steps[0].title}</span></span><div class="workspace-actions"><button type="button" class="read-mode" aria-pressed="false">${icon('rows-3')}<span>完整阅读</span></button><a href="operations_dashboard.html" class="tool-link">${icon('chart-no-axes-combined')}<span>运营看板</span>${icon('arrow-up-right')}</a></div></div>
      <div class="workspace-panels"></div>
      <nav class="workflow-footer" aria-label="流程翻页"><button type="button" class="step-prev" aria-label="上一步">${icon('arrow-left')}<span>上一步</span></button><span class="step-position" aria-live="polite">01 / 05</span><button type="button" class="step-next"><span>下一步：${steps[1].title}</span>${icon('arrow-right')}</button></nav>
    </div>`;
  main.prepend(workspace);

  // Move the original evidence and charts intact; old section URLs remain valid.
  const panels = steps.map((step, index) => {
    const panel = document.createElement('div');
    panel.className = 'workflow-panel';
    panel.id = `panel-${step.id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `step-${step.id}`);
    panel.tabIndex = 0;
    step.sections.forEach(id => {
      const section = sections[id];
      section.classList.remove('report');
      if (id === 'content-test' || id === 'sop') {
        const details = document.createElement('details');
        details.className = 'evidence-drawer';
        details.innerHTML = `<summary>${icon(id === 'sop' ? 'chart-no-axes-combined' : 'split')}<span>${id === 'sop' ? 'AI 辅助运营看板' : '内容对比测试'}<small>${id === 'sop' ? '模拟数据 · 分析方法演示' : '版本示意 · 非历史投放截图'}</small></span>${icon('chevron-down')}</summary>`;
        if (id === 'sop') {
          details.classList.add('tool-drawer');
          details.open = true;
          $('.dashboard-shot', section).before($('.demo-footer', section));
        }
        details.append(section);
        panel.append(details);
      } else panel.append(section);
    });
    $('.workspace-panels', workspace).append(panel);
    panel.hidden = index !== 0;
    return panel;
  });
  $$('main > .band').forEach(band => band.remove());
  document.body.classList.add('interactive-case');

  $('.nav-links').innerHTML = `<a href="#overview">需求与推荐</a><a href="#materials">品牌内容</a><a href="#results">项目结果</a><a href="operations_dashboard.html">AI 运营看板 ${icon('arrow-up-right')}</a>`;
  $('.snapshot .metric-strip').innerHTML = `
    <a class="summary-stat" href="#materials"><strong>100<span>+</span></strong><span>内容输出<small>公众号 / 小红书 / 社群</small></span>${icon('arrow-up-right')}</a>
    <a class="summary-stat" href="#results"><strong>+50<span>%</span></strong><span>新增注册<small>投放期较前一周</small></span>${icon('arrow-up-right')}</a>
    <a class="summary-stat" href="#research"><strong><small>约</small>+15<span>%</span></strong><span>首次专题创建率<small>相对提升 · 期间整体结果</small></span>${icon('arrow-up-right')}</a>`;
  $('h1').innerHTML = 'AI产品品牌内容<span>YouNews</span>';
  $('h1').insertAdjacentHTML('afterend', '<p class="project-subtitle">客户需求、体验服务与推广转化</p>');
  $('#overview .kicker').textContent = '01 / CUSTOMER NEEDS & RECOMMENDATION';
  $('#overview h2').textContent = '从客户需求出发，讲清产品价值';
  $('#overview .section-lead').textContent = '通过用户反馈与价格问卷了解客户需求、使用场景和付费顾虑，再按使用阶段选择产品卖点、介绍内容与沟通渠道。下方为需求识别、产品推荐和后续体验的方法示例。';
  $('#campaigns .kicker').textContent = '03 / EXPERIENCE & SERVICE';
  $('#campaigns h2').textContent = '把产品介绍承接到体验与答疑';
  $('#channels .kicker').textContent = '04 / CHANNELS & CONVERSION';
  $('#channels h2').textContent = '围绕客群画像，调整推广内容';
  $('#channels .section-lead').textContent = '参与公众号、小红书及社群品牌内容运营，结合粉丝画像调整选题与表达；参与投放准备及上线跟踪，对标题、首图和内容开展A/B测试，结合转化表现调整推广与预算。';
  $('#results .kicker').textContent = '05 / RESULTS & REVIEW';
  $('#results h2').textContent = '从内容触达到注册与首次使用';
  $('#results .section-lead').textContent = '需求识别后提炼卖点，以品牌内容和现场讲解引导体验；结合AI辅助看板、测试结果与用户反馈调整内容和推广。以下为本人提供的实习期汇总结果。';
  $('#research .section-head').hidden = true;
  $('#research .review-journey').hidden = true;

  let active = 0;
  let fullRead = false;
  const stepTabs = $$('.workflow-tabs [role="tab"]');
  const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const rootTarget = () => workspace.scrollIntoView({ behavior: motion(), block: 'start' });
  function selectStep(index, { scroll = false, hash = true } = {}) {
    active = index;
    stepTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = !fullRead && i !== index;
    });
    $('.workspace-breadcrumb').innerHTML = `<b>0${index + 1}</b> / 05 <span>${steps[index].title}</span>`;
    $('.step-position').textContent = `0${index + 1} / 05`;
    $('.step-prev').disabled = index === 0;
    $('.step-next span').textContent = index === steps.length - 1 ? `回到${steps[0].title}` : `下一步：${steps[index + 1].title}`;
    $('.step-next').setAttribute('aria-label', $('.step-next span').textContent);
    if (hash) history.pushState(null, '', `#${steps[index].id}`);
    if (scroll) {
      if (fullRead) panels[index].scrollIntoView({ behavior: motion(), block: 'start' });
      else rootTarget();
      panels[index].focus({ preventScroll: true });
    }
    if (matchMedia('(max-width: 900px)').matches) {
      const rail = $('.workflow-tabs');
      const tabBox = stepTabs[index].getBoundingClientRect();
      const railBox = rail.getBoundingClientRect();
      if (tabBox.left < railBox.left || tabBox.right > railBox.right) {
        rail.scrollTo({ left: rail.scrollLeft + tabBox.left - railBox.left, behavior: motion() });
      }
    }
  }
  stepTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(index, { scroll: true }));
    tab.addEventListener('keydown', event => {
      const delta = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : delta ? (active + delta + 5) % 5 : null;
      if (next === null) return;
      event.preventDefault();
      selectStep(next);
      stepTabs[next].focus({ preventScroll: true });
      stepTabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });
  $('.step-prev').addEventListener('click', () => selectStep(Math.max(0, active - 1), { scroll: true }));
  $('.step-next').addEventListener('click', () => selectStep((active + 1) % 5, { scroll: true }));
  $('.read-mode').addEventListener('click', () => {
    fullRead = !fullRead;
    workspace.classList.toggle('is-full-read', fullRead);
    $('.read-mode').setAttribute('aria-pressed', String(fullRead));
    $('.read-mode span').textContent = fullRead ? '分步阅读' : '完整阅读';
    selectStep(active, { hash: false });
    rootTarget();
  });
  function followHash(scroll = true) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const index = steps.findIndex(step => step.sections.includes(id));
    if (index < 0) return;
    selectStep(index, { hash: false });
    const section = sections[id];
    const drawer = section.closest('details');
    if (drawer) drawer.open = true;
    if (scroll) {
      const target = id === steps[index].id ? panels[index] : drawer || section;
      target.scrollIntoView({ behavior: motion(), block: 'start' });
    }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const id = link.hash.slice(1);
    if (!steps.some(step => step.sections.includes(id))) return;
    event.preventDefault();
    history.pushState(null, '', link.hash);
    followHash();
  });
  window.addEventListener('popstate', () => {
    if (!location.hash) selectStep(0, { hash: false, scroll: true });
    else followHash();
  });
  window.addEventListener('hashchange', () => followHash());

  function selectableTabs(buttons, onSelect) {
    buttons.forEach((button, index) => {
      function select(i) {
        buttons.forEach((item, n) => { item.setAttribute('aria-selected', String(n === i)); item.tabIndex = n === i ? 0 : -1; });
        onSelect(i);
      }
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        const i = event.key === 'ArrowRight' ? (index + 1) % buttons.length : event.key === 'ArrowLeft' ? (index + buttons.length - 1) % buttons.length : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : null;
        if (i === null) return;
        event.preventDefault(); select(i); buttons[i].focus();
      });
    });
  }
  const needs = [
    ['信息太多，哪些值得持续关注？', '先说明持续追踪资讯的价值，帮助用户判断产品是否适合自己。', '用“信息焦虑自救计划”切入使用场景，再接上产品定位与功能说明。', '小红书呈现场景，公众号展开介绍，科技活动辅助产品体验。', '内容阅读与互动，以及能够追踪的产品访问和新增注册。', '从了解价值进入产品体验，补充首次使用指引。', '03-awareness.jpg', '信息焦虑自救计划'],
    ['已经注册，第一步该做什么？', '减少从注册到首次操作的理解障碍，让用户能完成第一次专题创建。', '用专题创建图讲清操作入口；补充功能教程、常见问题和场景示例。', '公众号提供完整教程，社群承接答疑，产品内容指向专题创建。', '首次专题创建情况，以及入口、关键词设置和操作中的反馈。', '完成首次专题创建，将共性问题反馈到教程与产品团队。', '08-topic-creation.png', '创建专题'],
    ['完成第一次使用，之后还可以怎么用？', '把一次尝试连接到日常资讯需求，了解用户后续阅读与追踪偏好。', '用专属日报、专题解读介绍后续用途，再通过体验问卷收集建议。', '公众号呈现持续使用场景，社群交流使用问题，并分发体验问卷。', '后续使用反馈、内容偏好与付费意愿；可追踪时观察持续使用。', '补充日常阅读内容与FAQ，按反馈调整后续触达。', '10-daily-digest.png', '专属日报']
  ];
  selectableTabs($$('[data-need]'), index => {
    const [question, reason, action, channel, review, next, file, title] = needs[index];
    $('.need-question').textContent = question;
    $('[data-need-reason]').textContent = reason;
    $('[data-need-action]').textContent = action;
    $('[data-need-channel]').textContent = channel;
    $('[data-need-review]').textContent = review;
    $('[data-need-next]').textContent = next;
    $('.need-evidence img').src = `event-materials/${file}`;
    $('.need-evidence img').alt = title;
    $('.need-evidence strong').textContent = title;
    $('#need-detail').setAttribute('aria-labelledby', $$('[data-need]')[index].id);
  });

  const campaignRoute = document.createElement('div');
  campaignRoute.className = 'campaign-flow';
  campaignRoute.innerHTML = `<div class="campaign-flow-label"><span>产品介绍 → 体验 → 答疑 → 反馈</span><span>客户体验路径 · 按实际工作整理</span></div><ol>${[
    ['看见价值', '上新与场景海报', 'megaphone'], ['产生兴趣', '功能与体验说明', 'mouse-pointer-2'], ['开始使用', '专题创建与答疑', 'square-plus'], ['反馈问题', '社群交流与问卷', 'messages-square']
  ].map(([name, detail, symbol], i) => `<li>${icon(symbol)}<span>0${i + 1}</span><h3>${name}</h3><p>${detail}</p></li>`).join('')}</ol><a class="evidence-jump" href="#materials">查看对应宣传物料 ${icon('arrow-right')}</a>`;
  $('#campaigns .section-head').after(campaignRoute);
  const campaignTabs = document.createElement('div');
  campaignTabs.className = 'campaign-tabs need-tabs';
  campaignTabs.setAttribute('role', 'tablist');
  campaignTabs.setAttribute('aria-label', '活动类型');
  const campaignBriefs = $$('.campaign-brief');
  campaignTabs.innerHTML = ['线上内容 · 体验引导', '线下活动 · 讲解与交流'].map((title, i) => `<button type="button" role="tab" id="campaign-tab-${i}" aria-controls="campaign-detail-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${title}</button>`).join('');
  campaignRoute.before(campaignTabs);
  campaignBriefs.forEach((brief, i) => {
    brief.id = `campaign-detail-${i}`;
    brief.setAttribute('role', 'tabpanel');
    brief.setAttribute('aria-labelledby', `campaign-tab-${i}`);
    brief.tabIndex = 0;
  });
  campaignBriefs[1].append($('.field-evidence'));
  const showCampaign = i => {
    campaignBriefs.forEach((brief, n) => { brief.hidden = n !== i; });
    campaignRoute.hidden = i !== 0;
  };
  selectableTabs($$('button', campaignTabs), showCampaign);
  showCampaign(0);

  const materials = sections.materials;
  materials.classList.add('section');
  $('h3', materials).outerHTML = '<div class="section-head"><div><p class="kicker">02 / BRAND CONTENT & AI CREATION</p><h2>用品牌内容，把产品卖点讲清楚</h2></div><p class="section-lead">结合粉丝画像和用户问题确定选题，运用AI辅助起草文案与整理素材，核对产品功能、参与规则和品牌表达后发布。累计输出100+条产品介绍、场景推荐及FAQ内容，以下保留原有宣传作品。</p></div>';
  $('.materials-intro').hidden = true;
  const figures = $$('.campaign-material', materials);
  const materialNotes = [
    ['让用户知道 YouNews 是什么。', '提炼产品定位，完成海报文案与视觉制作。', '了解功能，进入产品。'],
    ['让用户知道如何开始追踪。', '突出输入话题与创建专题的操作入口。', '完成首次专题创建。'],
    ['讲清不同解读方式的用途。', '并列展示概览、大白话与深度解读。', '选择适合自己的阅读方式。'],
    ['说明产品在日常阅读中的用途。', '用日报界面展示专题更新如何汇总。', '关注专题，查看持续更新。'],
    ['从信息分散、反复搜索的困扰切入。', '将资讯追踪功能转化为场景化表达。', '判断是否适合自己，了解产品。'],
    ['给感兴趣的用户一个体验理由。', '整理体验内容、活动权益与参与说明。', '按活动说明参与体验。'],
    ['为使用中的问题提供交流入口。', '讲清答疑、功能体验与社群支持。', '进入社群，交流使用问题。'],
    ['邀请体验用户反馈问题与建议。', '整理参与对象、填写方式与奖励说明。', '填写体验问卷。']
  ];
  const viewer = document.createElement('div');
  viewer.className = 'creative-viewer';
  viewer.innerHTML = `<div class="creative-image"><img alt=""><button type="button" class="creative-zoom" aria-label="放大查看海报" title="放大查看海报">${icon('expand')}</button></div><div class="creative-annotation"><p class="creative-index">01 / 08</p><h3></h3><dl><div><dt>传播目的</dt><dd data-creative-purpose></dd></div><div><dt>我的处理</dt><dd data-creative-work></dd></div><div><dt>用户下一步</dt><dd data-creative-next></dd></div></dl><p class="creative-credit">AI辅助文案与素材整理 · 信息核对与视觉制作 / 李世怡</p></div>`;
  $('.materials-credit').after(viewer);
  let selectedMaterial = 0;
  let openingLightbox = false;
  function selectMaterial(index) {
    selectedMaterial = index;
    const figure = figures[index];
    const source = $('img', figure);
    $('.creative-image img').src = source.src;
    $('.creative-image img').alt = source.alt;
    $('.creative-annotation h3').textContent = $('figcaption strong', figure).textContent;
    $('.creative-index').textContent = `0${index + 1} / 08`;
    $('[data-creative-purpose]').textContent = materialNotes[index][0];
    $('[data-creative-work]').textContent = materialNotes[index][1];
    $('[data-creative-next]').textContent = materialNotes[index][2];
    figures.forEach((item, i) => { item.classList.toggle('is-selected', i === index); $('a', item).setAttribute('aria-pressed', String(i === index)); });
  }
  figures.forEach((figure, index) => {
    const link = $('a', figure);
    link.setAttribute('role', 'button');
    link.setAttribute('aria-label', `选择海报：${$('figcaption strong', figure).textContent}`);
    link.addEventListener('click', event => {
      if (openingLightbox || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); event.stopImmediatePropagation();
      selectMaterial(index);
    }, true);
    link.addEventListener('keydown', event => { if (event.key === ' ') { event.preventDefault(); link.click(); } });
  });
  $('.creative-zoom').addEventListener('click', () => {
    openingLightbox = true;
    try { $('a', figures[selectedMaterial]).click(); } finally { openingLightbox = false; }
  });
  $('.material-lightbox').addEventListener('close', () => $('.creative-zoom').focus({ preventScroll: true }));
  selectMaterial(0);

  const channelMap = $('.channel-map');
  const channels = [
    ['公众号', '完整讲清产品价值', '产品介绍、功能教程与行业案例', '用较完整的内容说明产品功能、适用场景与操作步骤。', '阅读与互动，以及用户对功能和使用方式的反馈。'],
    ['小红书', '从具体使用场景切入', '场景选题、标题与首图', '围绕资讯分散、反复搜索等使用问题组织内容，调整标题与文案表达。', '内容阅读、收藏与评论中的需求信号。'],
    ['社群', '把关注接到实际使用', '内容分发、答疑与反馈收集', '分发相关内容，结合交流中的问题补充教程和FAQ。', '能够追踪的访问与注册，以及后续使用问题。']
  ];
  channelMap.innerHTML = `<div class="channel-select" role="tablist" aria-label="分发渠道">${channels.map((item, i) => `<button type="button" id="channel-${i}" role="tab" aria-controls="channel-detail" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span>0${i + 1}</span>${item[0]}${icon('arrow-right')}</button>`).join('')}</div><div id="channel-detail" role="tabpanel" aria-labelledby="channel-0" tabindex="0"><span class="channel-content-label"></span><h3></h3><dl><div><dt>内容处理</dt><dd data-channel-action></dd></div><div><dt>发布后看</dt><dd data-channel-review></dd></div></dl></div>`;
  function selectChannel(index) {
    $('.channel-content-label').textContent = channels[index][2];
    $('#channel-detail h3').textContent = channels[index][1];
    $('[data-channel-action]').textContent = channels[index][3];
    $('[data-channel-review]').textContent = channels[index][4];
    $('#channel-detail').setAttribute('aria-labelledby', `channel-${index}`);
  }
  selectableTabs($$('.channel-select button'), selectChannel);
  selectChannel(0);

  const chartTabs = document.createElement('div');
  chartTabs.className = 'chart-tabs';
  chartTabs.setAttribute('role', 'tablist');
  chartTabs.setAttribute('aria-label', '复盘指标');
  chartTabs.innerHTML = '<button type="button" role="tab" id="chart-registration" aria-controls="chart-0" aria-selected="true">新增注册 <strong>+50%</strong></button><button type="button" role="tab" id="chart-activation" aria-controls="chart-1" aria-selected="false" tabindex="-1">首次专题创建率 <strong>约 +15%</strong></button>';
  $('.result-charts').before(chartTabs);
  const charts = $$('.result-chart');
  charts.forEach((chart, index) => {
    chart.id = `chart-${index}`;
    chart.setAttribute('role', 'tabpanel');
    chart.setAttribute('aria-labelledby', index === 0 ? 'chart-registration' : 'chart-activation');
    chart.tabIndex = 0;
    chart.hidden = index !== 0;
  });
  selectableTabs($$('.chart-tabs button'), index => charts.forEach((chart, i) => { chart.hidden = i !== index; }));
  const loop = document.createElement('a');
  loop.className = 'review-loop';
  loop.href = '#overview';
  loop.innerHTML = `${icon('corner-up-left')}<span><strong>把复盘带回下一轮内容与服务</strong><small>客户反馈 → 卖点、FAQ与渠道调整 → 发布与体验 → 再观察</small></span>${icon('arrow-right')}`;
  $('#research').append(loop);

  if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.6, 'aria-hidden': 'true' } });
  selectStep(0, { hash: false });
  if (location.hash) requestAnimationFrame(() => followHash());
  const narrow = matchMedia('(max-width: 900px)');
  const updateOrientation = () => $('.workflow-tabs').setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
  updateOrientation();
  narrow.addEventListener('change', updateOrientation);
})();
