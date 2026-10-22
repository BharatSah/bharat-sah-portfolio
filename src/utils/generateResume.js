import { profile, social, skillGroups, projects, education } from '../data/portfolio'

const COLORS = {
  ink: [16, 16, 18],
  body: [42, 42, 46],
  muted: [105, 105, 110],
  rule: [222, 222, 226],
  white: [255, 255, 255],
}

const cleanUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

// Build the document from the portfolio's verified data. Exported separately
// so the layout can be tested without triggering a browser download.
export function buildResumeDocument(jsPDF) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 42
  const contentWidth = pageWidth - margin * 2
  const footerReserve = 42
  let y = 142

  const addContinuationHeader = () => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.muted)
    doc.text(`${profile.name}  |  ${profile.role}`, margin, 27)
    doc.setDrawColor(...COLORS.rule)
    doc.setLineWidth(0.7)
    doc.line(margin, 37, pageWidth - margin, 37)
    y = 55
  }

  const ensureSpace = (heightNeeded) => {
    if (y + heightNeeded <= pageHeight - footerReserve) return
    doc.addPage()
    addContinuationHeader()
  }

  const addSection = (title) => {
    ensureSpace(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.ink)
    doc.text(title.toUpperCase(), margin, y)
    const labelWidth = doc.getTextWidth(title.toUpperCase())
    doc.setDrawColor(...COLORS.rule)
    doc.setLineWidth(0.7)
    doc.line(margin + labelWidth + 12, y - 3, pageWidth - margin, y - 3)
    y += 18
  }

  const addParagraph = (text, { size = 9.5, lineHeight = 13, color = COLORS.body } = {}) => {
    if (!text) return
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(size)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, contentWidth)
    const blockHeight = lines.length * lineHeight
    ensureSpace(blockHeight + 4)
    doc.text(lines, margin, y)
    y += blockHeight
  }

  // High-contrast nameplate with concise, clickable contact links.
  doc.setFillColor(...COLORS.ink)
  doc.rect(0, 0, pageWidth, 118, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(27)
  doc.setTextColor(...COLORS.white)
  doc.text(profile.name, margin, 48)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(218, 218, 222)
  doc.text(profile.role, margin, 70)

  const contacts = [
    social.email ? { label: social.email, url: `mailto:${social.email}` } : null,
    social.github ? { label: cleanUrl(social.github), url: social.github } : null,
    social.linkedin ? { label: cleanUrl(social.linkedin), url: social.linkedin } : null,
  ].filter(Boolean)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.2)
  doc.setTextColor(240, 240, 242)
  let contactX = margin
  contacts.forEach((contact, index) => {
    if (index > 0) {
      doc.setTextColor(150, 150, 156)
      doc.text('·', contactX, 99)
      contactX += 13
      doc.setTextColor(240, 240, 242)
    }
    const labelWidth = doc.getTextWidth(contact.label)
    if (typeof doc.textWithLink === 'function') {
      doc.textWithLink(contact.label, contactX, 99, { url: contact.url })
    } else {
      doc.text(contact.label, contactX, 99)
    }
    contactX += labelWidth + 18
  })

  // Profile summary.
  addSection('Profile')
  addParagraph(profile.about, { size: 9.5, lineHeight: 13.2 })
  y += 7

  // Two-column skills overview; no fabricated ratings or proficiency bars.
  addSection('Skills')
  const columnGap = 24
  const columnWidth = (contentWidth - columnGap) / 2
  for (let index = 0; index < skillGroups.length; index += 2) {
    const rowGroups = skillGroups.slice(index, index + 2)
    const row = rowGroups.map((group, column) => {
      const names = group.items.map((item) => item.name).join(' · ')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      return {
        category: group.category,
        names,
        lines: doc.splitTextToSize(names, columnWidth),
        x: margin + column * (columnWidth + columnGap),
      }
    })
    const rowHeight = Math.max(27, ...row.map((item) => 13 + item.lines.length * 10.5))
    ensureSpace(rowHeight + 5)
    row.forEach((item) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.8)
      doc.setTextColor(...COLORS.muted)
      doc.text(item.category.toUpperCase(), item.x, y)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...COLORS.body)
      doc.text(item.lines, item.x, y + 13)
    })
    y += rowHeight + 5
  }
  y += 3

  // Selected projects with real configured destinations where available.
  addSection('Selected Project')
  projects.forEach((project) => {
    const descriptionLines = doc.splitTextToSize(project.description, contentWidth)
    const requiredHeight = 16 + descriptionLines.length * 12.5 + 28
    ensureSpace(requiredHeight)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...COLORS.body)
    doc.text(project.title, margin, y)
    y += 15

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.body)
    doc.text(descriptionLines, margin, y)
    y += descriptionLines.length * 12.5 + 4

    const stack = project.tags?.length ? `Stack: ${project.tags.join(' · ')}` : ''
    if (stack) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.2)
      doc.setTextColor(...COLORS.muted)
      doc.text(stack, margin, y)
      y += 13
    }

    const projectLinks = [
      project.demoUrl ? { label: 'Live Demo', url: project.demoUrl } : null,
      project.codeUrl ? { label: 'GitHub', url: project.codeUrl } : null,
    ].filter(Boolean)
    let linkX = margin
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.2)
    doc.setTextColor(...COLORS.ink)
    projectLinks.forEach((link, index) => {
      if (index > 0) {
        doc.setTextColor(...COLORS.muted)
        doc.text('·', linkX, y)
        linkX += 13
        doc.setTextColor(...COLORS.ink)
      }
      const labelWidth = doc.getTextWidth(link.label)
      if (typeof doc.textWithLink === 'function') {
        doc.textWithLink(link.label, linkX, y, { url: link.url })
      } else {
        doc.text(link.label, linkX, y)
      }
      linkX += labelWidth + 18
    })
    y += 17
  })

  // Education, using only the level and institution details already provided.
  addSection('Education')
  education.forEach((item) => {
    ensureSpace(34)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.body)
    doc.text(item.level, margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.8)
    doc.setTextColor(...COLORS.muted)
    doc.text(`${item.institution} · ${item.location}`, margin, y + 13)
    y += 29
  })

  // Consistent footer and page numbers if future content needs more than one page.
  const pageCount = doc.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page)
    doc.setDrawColor(...COLORS.rule)
    doc.setLineWidth(0.7)
    doc.line(margin, pageHeight - 30, pageWidth - margin, pageHeight - 30)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.8)
    doc.setTextColor(...COLORS.muted)
    doc.text(`${profile.name} · Resume`, margin, pageHeight - 17)
    doc.text(`Page ${page} of ${pageCount}`, pageWidth - margin, pageHeight - 17, { align: 'right' })
  }

  return doc
}

// jsPDF remains lazy-loaded so the PDF library stays out of the main bundle.
export async function generateResume() {
  const { jsPDF } = await import('jspdf')
  const doc = buildResumeDocument(jsPDF)
  doc.save(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`)
}
