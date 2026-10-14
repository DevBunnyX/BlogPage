Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = Join-Path $PSScriptRoot "sample_fever_guide.docx"
if (Test-Path $docxPath) { Remove-Item $docxPath -Force }

$tempDir = Join-Path $PSScriptRoot "docx_temp"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path (Join-Path $tempDir "_rels") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempDir "word\_rels") -Force | Out-Null

$contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
'@
[System.IO.File]::WriteAllText((Join-Path $tempDir "[Content_Types].xml"), $contentTypes)

$dotRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'@
[System.IO.File]::WriteAllText((Join-Path $tempDir "_rels\.rels"), $dotRels)

$documentXml = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="48"/></w:rPr><w:t>Fever and Pyrexia: Clinical Insights and Home Care</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:i/></w:rPr><w:t>A fever, medically known as pyrexia, is a natural defense mechanism against pathogens. Here is how to navigate treatment, care plans, and recovery safely.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/></w:rPr><w:t>Introduction to Pyrexia</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Pyrexia is an elevation in core body temperature above the standard 98.6°F (37°C). It is stimulated by pyrogens acting directly on the hypothalamus.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Not all fevers require antibiotic intervention; establishing viral vs. bacterial etiology is essential before medication.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/></w:rPr><w:t>Common Causes of Fever</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>The most prevalent causes include:</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>• Viral Infections: </w:t></w:r>
      <w:r><w:t>Influenza, Dengue, Rhinovirus, and COVID-19.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>• Bacterial Infections: </w:t></w:r>
      <w:r><w:t>Streptococcal pharyngitis, urinary tract infections, and pneumonia.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>• Systemic &amp; Environmental: </w:t></w:r>
      <w:r><w:t>Post-vaccine reaction, heat exhaustion, and autoimmune flare-ups.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/></w:rPr><w:t>Nursing Care Plan and Patient Comfort</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Key nursing interventions consist of frequent vital checks, maintaining oral fluid balance, administering antipyretics on schedule, and using tepid sponge baths.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/></w:rPr><w:t>Frequently Asked Questions (FAQs)</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Q: Is paracetamol an antibiotic?</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>A: No, paracetamol is an antipyretic and analgesic. It relieves discomfort and brings down temperature but does not kill bacteria.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Q: How long does viral fever typically last?</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>A: In most patients, viral fevers resolve spontaneously within 3 to 7 days with adequate rest and hydration.</w:t></w:r>
    </w:p>
  </w:body>
</w:document>
'@
[System.IO.File]::WriteAllText((Join-Path $tempDir "word\document.xml"), $documentXml)

[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $docxPath)
Remove-Item $tempDir -Recurse -Force
Write-Host "Successfully generated valid sample DOCX: $docxPath"

