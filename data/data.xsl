<!-- Style file to display data.xml in a way allowing for a quick modification of fields -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:template match="/">
<html>
	<body onload="window.refresh();">
		<h2>Graffiti Data (edit):</h2>
		<xsl:for-each select="graffiti_list/graffiti">
			<!-- Change how to sort graffitis (artists/suburbs/etc.) -->
			<xsl:sort select="artist"/>
			<form method="post" action="edit_data.php">
				<table border="0">
					<tr>
						<td></td>
						<td></td>
						<td rowspan="119">
							<!-- Show the photo -->
							<img>
								<xsl:attribute name="src"> <xsl:value-of select="concat('../photos/',suburb,'/',file_name)" /> </xsl:attribute>
								<xsl:attribute name="height"> 300 </xsl:attribute>
							</img>
						</td>
					</tr>
					<xsl:for-each select="*">
						<!-- Allow modification for each field -->
						<tr>
							<td>
								<xsl:value-of select ="name(.)"/>
							</td>
							<td>
								<input type="text" size="100">
									<xsl:attribute name="id"> <xsl:value-of select="concat(../@id,'_',name(.))" /></xsl:attribute>
									<xsl:attribute name="name"><xsl:value-of select="concat(../@id,'_',name(.))" /></xsl:attribute>
									<xsl:attribute name="value"> <xsl:value-of select="."/></xsl:attribute>
								</input>
							</td>
						</tr>
					</xsl:for-each>
				</table>
				<br />
				<input type="submit" id="btn_sub" name="btn_sub" value="Submit" />
				<input type="reset" id="btn_reset" name="btn_reset" value="Reset" />
			</form>
			<hr></hr>
		</xsl:for-each>	
	</body>
</html>
</xsl:template>
</xsl:stylesheet>