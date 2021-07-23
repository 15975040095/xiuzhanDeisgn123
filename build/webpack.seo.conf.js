'use strict'

const path = require('path')
const merge = require('webpack-merge')
const prodWebpackConfig = require('./webpack.prod.conf')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const RenameWebpackPlugin = require('rename-webpack-plugin')

const phpCode = `
<?php
include_once(dirname($_SERVER['DOCUMENT_ROOT']) . '/private_html/sessiondata.php');
// if (empty($_SESSION['uId'])) {
//   $isActive = false;
// } else {
//   if ($session_type == '0') {
//     $isActive = $session_emailAuditStatus == '1' || $session_phoneAuditStatus == '1';
//   } else {
//     $isActive = true;
//   }
// }
?>
<script>
  window._userData = {
    uId: '<?php echo $session_uid;?>',
    uType: '<?php echo $session_uType;?>',
    uLink: '<?php echo $session_linkName;?>',
    uEmail: '<?php echo $session_umail;?>',
    uPhone: '<?php echo $session_mobilePhone;?>',
    uMail: '<?php echo $session_umail;?>',
    uName: '<?php echo $session_username;?>',
    isActive: '<?php echo $session_isActive ? "1" : "0";?>' == '1',
    isAdmin: '<?php echo $session_isAdmin ? "1" : "0";?>' == '1',
    accountLogo: '<?php echo $session_accountLogo;?>',
    bannerLogo: '<?php echo $session_bannerLogo;?>',
    fullName: '<?php echo $session_fullName;?>',
    sex: '<?php echo $session_sex;?>',
    qq: '<?php echo $session_qq;?>',
    about: '<?php echo $session_about;?>',
    position: '<?php echo $session_position;?>',
    company: '<?php echo $session_company;?>',
    industryId: '<?php echo $session_industryId;?>',
    companyAddress: '<?php echo $session_companyAddress;?>',
    companyPhone: '<?php echo $session_companyPhone;?>',
    website: '<?php echo $session_website;?>',
    type: '<?php echo $session_type;?>',
    expirationDate: '<?php echo $session_expirationDate;?>',
    qqOpenId: '<?php echo $session_qq_openid;?>',
    wxOpenId: '<?php echo $session_wx_openid;?>',
    wxName: '<?php echo $session_wx_name;?>',
    qqName: '<?php echo $session_qq_name;?>'
  }
</script>
`
const webpackConfig = merge(prodWebpackConfig, {
  plugins: [
    new PrerenderSpaPlugin ({
      staticDir: path.join(__dirname, '../dist'),
      // routes: ['/', '/templates', '/features', '/about', '/pricing', '/login', '/signUp', '/forget-password', '/serve', '/privacy', '/tort', '/disclaimer', '/copyright', '/support'],
      routes: ['/'],
      postProcess (renderedRoute) {
        // Ignore any redirects.
        renderedRoute.path = renderedRoute.originalPath
        // Basic whitespace removal. (Don't use this in production.)
        renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><').replace('<html>', phpCode + '<html>')

        return renderedRoute
      },
    })
    // // rename index.html to index.php
    // new RenameWebpackPlugin({
    //   originNameReg: /index.html/,
    //   targetName: 'index2.php'
    // })
  ]
})

module.exports = webpackConfig
