// JavaScript Document
$(function(){
	$('form').jqTransform({imgPath:'./jqtransformplugin/img/'});
});
//获取库中所有的表
$(function(){
	$('#getTable').click(function(){
		if ($('#sel').find("option:selected").val()=="choosdb"){$("#show_table_ul").empty(); return};
		$.ajax({
		url: "./TableManage/Action.php",
		type: "get",
		data:{"cosplay":"getTables","db":$('#sel').find("option:selected").text(),"rid":Math.random()},
		dataType:'json',   //接受数据格式
		beforeSend: function(XMLHttpRequest){
			$("#notice").html('loading');
			$("#show_table").hide(0);
			//ShowLoading();
		},
		success: function(data,stat){
			$("#notice").html('');
			$("#show_table_ul").empty();
			var json = eval(data);
			//var myjson='';
			$.each(json,function(idx,item){
				$("#show_table_ul").append("<li id='show_table_li' ><a href=# class=li_button >"+item.table+"</a></li>");
			});
			$("#show_table").show(150);  //显示
			$('.li_button').click(function(){//处理AJAX返回TABLE的事件。
					getTable(this,1,'');
			});
		},
		error: function(xhr,status,errorThrown){
			alert (errorThrown+'\n'+status+'\n'+xhr.statusText);
			$("#notice").html(errorThrown+'\n'+status+'\n'+xhr.statusText);
		}
		});
		//alert(x);
	})
});
//获取表中的数据
//selBtn   not null 当前选择的表
//page     null     页数，默认为1
//columns  null     要显示的列，默认为所有
function getTable(selBtn,page,columns)
{
		//获取 select 选中的值，注：这里不要用NAME
		var table = $(selBtn).text();
		var db = $('#sel').find("option:selected").text();
		var x =  "./TableManage/Action.php";
		//alert(x);
		if ($('#sel').find("option:selected").val()=="choosdb"){$("#show_table_ul").empty(); return}
		//alert(x);
		$.ajax({
		url: x ,
		type: "get",
		data:{"cosplay":"showTable","db":db,"table":table,"rid":Math.random(),"page":page,"columns":columns},
		dataType:'json',   //接受数据格式
		beforeSend: function(XMLHttpRequest){
			//$("#notice_table").html('loading');
			//ShowLoading();
		},
		success: function(data,stat){
			//$("#table_detial").hide(100);
			$("#notice_table").html('');
			$("#show_table_columns_table").empty();//初使化表格元素
			$('#table_columns').empty();//初使化
			$('#row_tr').empty();//初使化
			$("#do_page_ul").empty();//初使化分页元素
			$('#table_columns').hide();
			var json = eval(data);
			var vColumn='';
			var vRow='';
			var vType='';
			var vExtra='';
			var xx=1;//用于记录字段数
			var yy=1;//与xx合并处理JSON中的 row 何时换行。
			var cid=-1;
			var rid=1;//行ID
			//$("#show_table_columns_table").append("<tr id='show_table_columns_tr'></tr>");
			$.each(json,function(idx,item){
				if(item.column != null & item.column != ''){
					vColumn += "<td class='show_table_columns_td' >"+item.column+"</td>";//获取列
					xx++;
				}
				if(item.CType != null & item.CType != ''){
					vType += "<td class='show_table_columns_td' >"+item.CType+"</td>";//获取类型
				}
				if(item.CExtra != null){
					vExtra += "<td class='show_table_columns_td' >"+item.CExtra+"</td>";//是否为自增ID
				}
				if(item.column != null & item.column != ''){
					$("#table_columns").append("<div id='rowElem'><input type='checkbox' checked='checked' class='chbox' name='sel_column' value='"+item.column+"'><label>"+ item.column +"</label></div>");
				}
				if(item.column==null & item.CType==null & item.CExtra==null & item.row != null ){//添加行
					if(yy%xx==0 & yy>=xx & xx!=0 & yy!=0){//判断何时换行，到达列的最大值换行。
							cid=0;
							vRow+="</tr><tr class='row_tr' id='"+rid+"' class='show_table_rows_tr' ><td class='row_td' id='"+cid+"'>"+item.row+"</td>";//获取行
							yy+=2;
							rid++;
							//alert(rid);
					}else if(item.column==null){
						//alert('xx:'+xx+'yy:'+yy+'yy%xx:'+yy%xx)
						//alert(item.row);
						cid = cid==-1 ? 0	 : cid+1 ;
						vRow += "<td class='row_td' id='"+cid+"' >"+item.row+"</td>";//正常行输出
						yy++;
					}
				}
				//分页
			  if(item.pages != null & item.pages!=''){
					if(item.pages==page){
						$('#do_page_ul').append("<li class='do_page_li' id='do_page_li_sel'>"+item.pages+"</li>");//当前页
					}else{
						$('#do_page_ul').append("<li class='do_page_li'>"+item.pages+"</li>");
					}
			  }
				
			});
			//alert('xx:'+xx+'yy:'+yy+'yy%xx:'+yy%xx);
			//v = replace(v,null,'');
			//alert(vRow);
			$("#show_table_columns_table").append("<tr>"+vColumn+"</tr>");//列添加到TABLE
			$("#show_table_columns_table").append("<tr class='p_h'>"+vExtra+"</tr>");//列添加到TABLE
			$("#show_table_columns_table").append("<tr class='p_h'>"+vType+"</tr>");//列添加到TABLE
			$("#show_table_columns_table").append("<tr class='row_tr' id='0'>"+vRow+"</tr>");//行添加到TABLE
			$('#table_columns').append("<div id='exec'><input class='btn' type='button' id='btn_all' value='全选' /><input type='button' id='btn_not' value='反选' class='btn' /><input class='btn' type='button' id='btn_exec' value='执行' /></div>");//添加查询按钮 控制选项按钮
			$('#btn_exec').click(function(){//处理查询事件
				getTable(selBtn,1,getColumns());
				//getColumns();
			});
			choosAllOrNot();//checkbox 全选与否
			eventClick_row(db,table,selBtn,page,columns);//单元格行，事件处理
			$("#table_detial").show(100);  //显示所选表内容
			$(".do_page_li").click(function(){
				getTable(selBtn,$(this).text(),getColumns());
			});
		},
			error: function(xhr,status,errorThrown){
			alert (errorThrown+'\n'+status+'\n'+xhr.statusText);
			$("#notice_table").html(errorThrown+'\n'+status+'\n'+xhr.statusText);
		}
		});
}
///////////////////设置区\\\\\\\\\\\\\\\\
//显示列
$(function(){
	$('#choos_Column').click(function(){
		var s = $('#table_columns');
		if((s.css("display"))=="none"){
			s.show(150);
		}else{
			s.hide(150);
		}
	});	
	$('#choos_style').click(function(){
		var s = $('#table_style');
		if((s.css("display"))=="none"){
			s.show(150);
		}else{
			s.hide(150);
		}
	});
	$('#FieldWidth,#RowHeight').keyup(function(){
		$('tr').height($('#RowHeight').val());
		$('td').width($('#FieldWidth').val());
		$('tr:eq(0)').height('37px');
	});
	$('#btnFieldApply').click(function(){
		$('tr').height('1px');
		$('td').width('1px');
		$('tr:eq(0)').height('37px');
	});
	$('#btnRowApply').click(function(){
		$('tr').height('auto');
		$('td').width('auto');
		$('tr:eq(0)').height('37px');
	});
});
//获取用户选择的列
function getColumns(){
	var str="";
	$("[name='sel_column'][checked]").each(function(){
		if($(this).prop('checked')==true)//1.6X 版本以后出现的兼容问题！
		{
			str+=$(this).val()+",";
		}
	});
	str = str.substring(0,str.length-1);
	return str;
}
//checkbox 全选与否
function choosAllOrNot(){
	$('#btn_all').click(function(){//全选
		$("[name='sel_column']").prop("checked",'true');//全选
	});
	$('#btn_not').click(function(){//反选
		$("[name='sel_column']").each(function(){ 
		if($(this).prop("checked")){   
			$(this).removeProp("checked"); 
  
		}else{   
			$(this).prop("checked",'true'); 
  
		}})
	});
	$('tr:even').addClass('odd');//隔行变色
}
//禁止右击
$(document).bind("contextmenu", function() { return false; });
//单元格行，事件处理
function eventClick_row(db,table,selBtn,page,columns)
{
	var editColumn='';
	var auto_increment = '';
	var auto_increment_value = '';
	var CType='';
	$(".row_td").mousedown(function(e){ //行中单元格事件
	 if(e.which == 3){//右击
	   //alert($(this).html());
	   	$('#control').empty();
		  $('#control').append("<div id='diagx_update'>更新</div>");
		  $('#control').append("<span id='diagx_notice'></span>");
		  $('#control').append("<div id='diagx_close'>关闭</div>");
			  //编辑窗口关闭
			$("#diagx_close").click(function(){
				$('#diagx').fadeOut('slow');
				$('#panle_f').empty();
				$('#panle_l').empty();
				$('#typeNotice').empty();//类型
				//$("#diagx_notice").empty();//清空状态
				//$("#diagx_notice").fadeOut('slow');
				getTable(selBtn,page,columns);
			});
	   btn_update();                            //加载更新事件
	   initEditor();                            //加载EDITOR
	   $('#diagx_txera').val($(this).text());   //植入数据
	   $('#diagx').fadeIn('slow');              //显示编辑器
	   editColumn = $("table tr:eq(0) td:eq("+$(this).prop('id')+")").text();//得到该行的第一列
	   CType = $("table tr:eq(2) td:eq("+$(this).prop('id')+")").text();//得到列类型值
	   //alert(editColumn);
	 }
	});
	//右击事件处理
	$(".row_tr").mousedown(function(e){ //行事件
	 if(e.which == 3){//右击
	 	 var TdInTr='';
	 	 var i=0;
	 	 var column='';
	 	 var sql_f = "update `"+db+"`.`"+table+"` set " + editColumn;
	 	 var sql_l = '';
	 	 var rid = parseInt($(this).prop('id'))+3;//获取当前行ID值.
	 	 //alert(rid);
	 	 $(this).find('td').each(function(){
	 	 		column = $("table tr:eq(1) td:eq("+i+")").text();
	 	 		if(column == 'auto_increment'){
	 	 				auto_increment = $("table tr:eq(0) td:eq("+$(this).prop('id')+")").text();//得到自增列
	 	 				auto_increment_value = $("table tr:eq("+rid+") td:eq("+$(this).prop('id')+")").text();//得到行中自增列的值
	 	 				sql_l = auto_increment + "=" + auto_increment_value ;
	 	 				//alert(sql_l);
	 	 				return false;
	 	 		}
	 	 		i++;
	 	 	});
	  if(sql_l==''){
		   	i=0;
		   	$(this).find('td').each(function(){
		   			//alert($(this).text());//找到所选行中，各单元格的数据。
			   		column = $("table tr:eq(0) td:eq("+i+")").text();
			   		if(editColumn != column & $(this).text() != null & $(this).text()!=''){
				   		TdInTr = $(this).text();
				   		i++;
				   		sql_l += column+" = '"+TdInTr+"' and ";
			   		}else{i++};
	  		});
	  	sql_l += '1=1 ';
	  }
	  //alert(sql_f+'where '+sql_l);
	  $('#typeNotice').html('注：类型为'+CType+' 请注意字符长度');
	  $('#panle_f').html(sql_f);
	  $('#panle_l').html(sql_l);
	 	}
	});
	
//单击变色事件
	$(".row_tr").click(function(){
		$(this).toggleClass('click');
		alert($(this).css('background-color'));
		 var TdInTr='';
	 	 var i=0;
	 	 var column='';
	 	 var sql_f = "delete from `"+db+"`.`"+table+"` where " ;
	 	 var sql_l = '';
	 	 var rid = parseInt($(this).prop('id'))+3;//获取当前行ID值.
	 	 //alert(rid);
	 	 $(this).find('td').each(function(){
	 	 		column = $("table tr:eq(1) td:eq("+i+")").text();
	 	 		if(column == 'auto_increment'){
	 	 				auto_increment = $("table tr:eq(0) td:eq("+$(this).prop('id')+")").text();//得到自增列
	 	 				auto_increment_value = $("table tr:eq("+rid+") td:eq("+$(this).prop('id')+")").text();//得到行中自增列的值
	 	 				sql_l = auto_increment + "=" + auto_increment_value ;
	 	 				//alert(sql_l);
	 	 				return false;
	 	 		}
	 	 		i++;
	 	 	});
	  	 if(sql_l==''){
		   	i=0;
		   	$(this).find('td').each(function(){
		   			//alert($(this).text());//找到所选行中，各单元格的数据。
			   		column = $("table tr:eq(0) td:eq("+i+")").text();
			   		if(editColumn != column & $(this).text() != null & $(this).text()!=''){
				   		TdInTr = $(this).text();
				   		i++;
				   		sql_l += column+" = '"+TdInTr+"' and ";
			   		}else{i++};
	  		});
	  	sql_l += '1=1 ';
	  }
		alert(sql_f+sql_l);
	});
}
$(function(){
	$("#execDEL2").click(function(){
				$("table").find('tr').each(function(){
					alert(parseInt($(this).prop('id')));
				});
	});
});
//加载JS
function loadJS(url,callback,charset)
{
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = function ()
	{
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		script.onload = script.onreadystatechange = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		if(callback)callback();
	};
	script.charset=charset || document.charset || document.characterSet;
	script.src = url;
	try {document.getElementsByTagName("head")[0].appendChild(script);} catch (e) {}
}
//加载XHEDITOR
function initEditor()
{
	loadJS('./xheditor/xheditor-1.1.8-zh-cn.min.js',function(){$('#diagx_txera').xheditor();$('#diagx_txera').focus()});
}
//处理更新事件
function btn_update()
{
	//$('#diagx_update').prop('maxlength')=50;
	$('#diagx_update').click(function(){
		//$('#diagx_txera').fadeOut('slow');
		var sql_f = $('#panle_f').text();
		var sql_setVal = $('#diagx_txera').val();
		var sql_l = $('#panle_l').text();
		execSQL(sql_f,sql_setVal,sql_l);
	});
}
//处理更新
function execSQL(sql_f,sql_setVal,sql_l){
		var x = "./TableManage/Action.php";
		//alert(sql_f+"--"+sql_setVal+""+sql_l);
		$.ajax({
		url: x ,
		type: "post",
		data:{"cosplay":"execSQL","sql_f":sql_f,"sql_setVal":sql_setVal,"sql_l":sql_l,},  //传输数据格式
		dataType:'json',   //接受数据格式
		beforeSend: function(XMLHttpRequest){
			$("#diagx_notice").html('loading');
			//ShowLoading();
		},
		success: function(data,stat){
			var json = eval(data);
			$.each(data,function(idx,item){
				if(item.execSqlResult != null & item.execSqlResult != ''){
					$("#diagx_notice").html(item.execSqlResult);
				}
			})
			$("#diagx_notice").fadeIn('slow');
		},
		error: function(xhr,status,errorThrown){
			alert (errorThrown+'\n'+status+'\n'+xhr.statusText);
		}
		})	
}