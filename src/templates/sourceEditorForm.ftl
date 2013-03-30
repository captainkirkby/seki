<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.1//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-2.dtd">
<!-- 
based on RDFaCE, http://aksw.org/Projects/RDFaCE
derived from TinyMCE
 -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>HTML Content Editor</title>
<link rel="stylesheet" type="text/css" href="css/page.css">
<!-- Load jquery-->
<script type="text/javascript" src="js/rdface/jquery.js"></script>
<!-- Load drag and resize library -->
<script type="text/javascript" src="js/rdface/jquery.DnR.js"></script>
<script type="text/javascript" src="js/rdface/dimensions.DnR.js"></script>
<!-- Load popular prefixes -->
<script type="text/javascript" src="js/rdface/prefixes.js"></script>
<!-- Load DOM Manipulator-->
<script type="text/javascript" src="js/rdface/DOMManipulator.js"></script>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- TinyMCE -->
<script type="text/javascript" src="js/rdface/tiny_mce.js"></script>
<!-- tiny_mce_gzip.js  -->
<script type="text/javascript">
tinyMCE_GZ.init({
<!-- user-defined plugins and themes should be identical to those in "tinyMCE.init" below.-->
        plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,rdface",
        themes : 'advanced',
        languages : 'en',
        disk_cache : true,
        debug : false
});
</script>

<script type="text/javascript">
  tinyMCE.init({
    // General options
    mode : "textareas",
    theme : "advanced",
    plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist,rdface",
    // Add XHHTML elements for RDFa
    valid_elements : "*[*]",
    // Theme options
    theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
    theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
    theme_advanced_buttons3 : "namespace,about,property,rdfGraph,rdfEnrich,stat,setting",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "bottom",
    theme_advanced_resizing : true,

    // Example content CSS (should be your site CSS)
    content_css : "css/content.css",

    // Drop lists for link/image/media/template dialogs
    template_external_list_url : "lists/template_list.js",
    external_link_list_url : "lists/link_list.js",
    external_image_list_url : "lists/image_list.js",
    media_external_list_url : "lists/media_list.js",

    // Style formats
    style_formats : [
      {title : 'Bold text', inline : 'b'},
      {title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
      {title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
      {title : 'Example 1', inline : 'span', classes : 'example1'},
      {title : 'Example 2', inline : 'span', classes : 'example2'},
      {title : 'Table styles'},
      {title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}
    ],

    // Replace values for the template plugin
    template_replace_values : {
      username : "Some User",
      staffid : "991234"
    }
  });
</script>
<!-- /TinyMCE -->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2622047-4']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  $.get('${contentURL}', function(data) {
	  $('#content').html(data);
	  // alert('Load was performed.');
	});

</script>
  <form method="post" action="/post">
    <div>
      <textarea id="content" name="content" rows="20" cols="70"
        style="width: 80%" class="tinymce"
      >Enter content here</textarea>
    </div>
    <br>
    <div align="left">

      <!--  
<a href="javascript:;" onclick="alert($('#content').tinymce().selection.getContent());return false;">[Get selected HTML]</a>

<span about="http://" style="border: 1px solid #8aadd6;">about</span>&nbsp;&nbsp;
<span typeof="foaf:type" style="border: 1px solid #88cc00;border-radius: 15px 15px 15px 15px; ">typeof</span>&nbsp;&nbsp;
<span property="foaf:property" style="border: 1px solid  #EB9861;border-radius: 15px 15px 15px 15px;">property/rel</span>
-->
    </div>
    <input type="hidden" value="post" name="type" />
    <label for="uri">Item URI</label>
    <input type="text" name="uri" id="uri" />
    <label for="title">Title</label>
    <input type="text" name="title" id="title" />
    <label for="nick">By</label>
    <input type="text" name="nick" id="nick" />
    <!-- input type="reset" name="reset" value="Reset" / -->
    <input type="submit" value="Post" />
    </div>
  </form>
  <!--  
  <div class="clearlooks2" style="width:308px; height:370px; left:420px;display:none;" id="tripleBrowser">
    <div class="mceWrapper mceMovable mceFocus">
      <div class="mceTop">
        <div class="mceLeft"></div>
        <div class="mceCenter"></div>
        <div class="mceRight"></div>
        <span>Triple Browser</span>
      </div>

      <div class="mceMiddle">
        <div class="mceLeft"></div>
        <span><iframe id="tripleFrame" height="345" width="300" frameborder="0" src="js/rdface/tripleBrowser.htm">
   Your browser can't display IFRAMEs
</iframe></span>
        <div class="mceRight"></div>
      </div>

      <div class="mceBottom">
        <div class="mceLeft"></div>
        <div class="mceCenter"></div>
        <div class="mceRight"></div>
        <span>Statusbar text.</span>
      </div>

      <a class="mceMove" href="#"></a>
      <a id="closeIcon" class="mceClose" href="#"></a>

    </div>
  </div>
  -->
  <div>
    <script type="text/javascript">
  if (document.location.protocol == 'file:') {
    alert("The examples might not work properly on the local file system due to security settings in your browser. Please use a real webserver.");
  }
</script>
