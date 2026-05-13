( function ( $, undefined ) {
	var __ = acf.__;

	var parseString = function ( val ) {
		return val ? '' + val : '';
	};

	var isEqualTo = function ( v1, v2 ) {
		return (
			parseString( v1 ).toLowerCase() === parseString( v2 ).toLowerCase()
		);
	};

	/**
	 * Checks if rule and selection are equal numbers.
	 *
	 * @param {string} v1 - The rule value to expect.
	 * @param {number|string|Array} v2 - The selected value to compare.
	 * @returns {boolean} Returns true if the values are equal numbers, otherwise returns false.
	 */
	var isEqualToNumber = function ( v1, v2 ) {
		if ( v2 instanceof Array ) {
			return v2.length === 1 && isEqualToNumber( v1, v2[ 0 ] );
		}
		return parseFloat( v1 ) === parseFloat( v2 );
	};

	var isGreaterThan = function ( v1, v2 ) {
		return parseFloat( v1 ) > parseFloat( v2 );
	};

	var isLessThan = function ( v1, v2 ) {
		return parseFloat( v1 ) < parseFloat( v2 );
	};

	var inArray = function ( v1, array ) {
		// cast all values as string
		array = array.map( function ( v2 ) {
			return parseString( v2 );
		} );

		return array.indexOf( v1 ) > -1;
	};

	var containsString = function ( haystack, needle ) {
		return parseString( haystack ).indexOf( parseString( needle ) ) > -1;
	};

	var matchesPattern = function ( v1, pattern ) {
		var regexp = new RegExp( parseString( pattern ), 'gi' );
		return parseString( v1 ).match( regexp );
	};

	const conditionalSelect2 = function ( field, type ) {
		const $select = $( '<select></select>' );
		let queryAction = `acf/fields/${ type }/query`;

		if ( type === 'user' ) {
			queryAction = 'acf/ajax/query_users';
		}

		const ajaxData = {
			action: queryAction,
			field_key: field.data.key,
			s: '',
			type: field.data.key,
		};

		const typeAttr = acf.escAttr( type );

		const template = function ( selection ) {
			return (
				`<span class="acf-${ typeAttr }-select-name acf-conditional-select-name">` +
				acf.strEscape( selection.text ) +
				'</span>'
			);
		};

		const resultsTemplate = function ( results ) {
			let classes = results.text.startsWith( '- ' )
				? `acf-${ typeAttr }-select-name acf-${ typeAttr }-select-sub-item`
				: `acf-${ typeAttr }-select-name`;
			return (
				'<span class="' +
				classes +
				'">' +
				acf.strEscape( results.text ) +
				'</span>' +
				`<span class="acf-${ typeAttr }-select-id acf-conditional-select-id">` +
				( results.id ? results.id : '' ) +
				'</span>'
			);
		};

		const select2Props = {
			field: false,
			ajax: true,
			ajaxAction: queryAction,
			ajaxData: function ( data ) {
				ajaxData.paged = data.paged;
				ajaxData.s = data.s;
				ajaxData.conditional_logic = true;
				ajaxData.include = $.isNumeric( data.s )
					? Number( data.s )
					: '';
				return acf.prepareForAjax( ajaxData );
			},
			escapeMarkup: function ( markup ) {
				return acf.escHtml( markup );
			},
			templateSelection: template,
			templateResult: resultsTemplate,
		};

		$select.data( 'acfSelect2Props', select2Props );
		return $select;
	};
	/**
	 *  Adds condition for Page Link having Page Link equal to.
	 *
	 *  @since 6.3
	 */
	var HasPageLink = acf.Condition.extend( {
		type: 'hasPageLink',
		operator: '==',
		label: __( 'Page is equal to' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			return isEqualTo( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'page_link' );
		},
	} );

	acf.registerConditionType( HasPageLink );

	/**
	 *  Adds condition for Page Link not equal to.
	 *
	 *  @since 6.3
	 */
	var HasPageLinkNotEqual = acf.Condition.extend( {
		type: 'hasPageLinkNotEqual',
		operator: '!==',
		label: __( 'Page is not equal to' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			return ! isEqualTo( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'page_link' );
		},
	} );

	acf.registerConditionType( HasPageLinkNotEqual );

	/**
	 *  Adds condition for Page Link containing a specific Page Link.
	 *
	 *  @since 6.3
	 */
	var containsPageLink = acf.Condition.extend( {
		type: 'containsPageLink',
		operator: '==contains',
		label: __( 'Pages contain' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = false;
			if ( val instanceof Array ) {
				match = val.includes( ruleVal );
			} else {
				match = val === ruleVal;
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'page_link' );
		},
	} );

	acf.registerConditionType( containsPageLink );

	/**
	 *  Adds condition for Page Link not containing a specific Page Link.
	 *
	 *  @since 6.3
	 */
	var containsNotPageLink = acf.Condition.extend( {
		type: 'containsNotPageLink',
		operator: '!=contains',
		label: __( 'Pages do not contain' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = true;
			if ( val instanceof Array ) {
				match = ! val.includes( ruleVal );
			} else {
				match = val !== ruleVal;
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'page_link' );
		},
	} );

	acf.registerConditionType( containsNotPageLink );

	/**
	 *  Adds condition for when any page link is selected.
	 *
	 *  @since 6.3
	 */
	var HasAnyPageLink = acf.Condition.extend( {
		type: 'hasAnyPageLink',
		operator: '!=empty',
		label: __( 'Has any page selected' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasAnyPageLink );

	/**
	 *  Adds condition for when no page link is selected.
	 *
	 *  @since 6.3
	 */
	var HasNoPageLink = acf.Condition.extend( {
		type: 'hasNoPageLink',
		operator: '==empty',
		label: __( 'Has no page selected' ),
		fieldTypes: [ 'page_link' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return ! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasNoPageLink );

	/**
	 *  Adds condition for user field having user equal to.
	 *
	 *  @since 6.3
	 */
	var HasUser = acf.Condition.extend( {
		type: 'hasUser',
		operator: '==',
		label: __( 'User is equal to' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			return isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'user' );
		},
	} );

	acf.registerConditionType( HasUser );

	/**
	 *  Adds condition for user field having user not equal to.
	 *
	 *  @since 6.3
	 */
	var HasUserNotEqual = acf.Condition.extend( {
		type: 'hasUserNotEqual',
		operator: '!==',
		label: __( 'User is not equal to' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			return ! isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'user' );
		},
	} );

	acf.registerConditionType( HasUserNotEqual );

	/**
	 *  Adds condition for user field containing a specific user.
	 *
	 *  @since 6.3
	 */
	var containsUser = acf.Condition.extend( {
		type: 'containsUser',
		operator: '==contains',
		label: __( 'Users contain' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = false;
			if ( val instanceof Array ) {
				match = val.includes( ruleVal );
			} else {
				match = val === ruleVal;
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'user' );
		},
	} );

	acf.registerConditionType( containsUser );

	/**
	 *  Adds condition for user field not containing a specific user.
	 *
	 *  @since 6.3
	 */
	var containsNotUser = acf.Condition.extend( {
		type: 'containsNotUser',
		operator: '!=contains',
		label: __( 'Users do not contain' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = true;
			if ( val instanceof Array ) {
				match = ! val.includes( ruleVal );
			} else {
				match = ! val === ruleVal;
			}
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'user' );
		},
	} );

	acf.registerConditionType( containsNotUser );

	/**
	 *  Adds condition for when any user is selected.
	 *
	 *  @since 6.3
	 */
	var HasAnyUser = acf.Condition.extend( {
		type: 'hasAnyUser',
		operator: '!=empty',
		label: __( 'Has any user selected' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasAnyUser );

	/**
	 *  Adds condition for when no user is selected.
	 *
	 *  @since 6.3
	 */
	var HasNoUser = acf.Condition.extend( {
		type: 'hasNoUser',
		operator: '==empty',
		label: __( 'Has no user selected' ),
		fieldTypes: [ 'user' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return ! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasNoUser );

	/**
	 *  Adds condition for Relationship having Relationship equal to.
	 *
	 *  @since	6.3
	 */
	var HasRelationship = acf.Condition.extend( {
		type: 'hasRelationship',
		operator: '==',
		label: __( 'Relationship is equal to' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			return isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'relationship' );
		},
	} );

	acf.registerConditionType( HasRelationship );

	/**
	 *  Adds condition for selection having Relationship not equal to.
	 *
	 *  @since	6.3
	 */
	var HasRelationshipNotEqual = acf.Condition.extend( {
		type: 'hasRelationshipNotEqual',
		operator: '!==',
		label: __( 'Relationship is not equal to' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			return ! isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'relationship' );
		},
	} );

	acf.registerConditionType( HasRelationshipNotEqual );

	/**
	 *  Adds condition for Relationship containing a specific Relationship.
	 *
	 *  @since	6.3
	 */
	var containsRelationship = acf.Condition.extend( {
		type: 'containsRelationship',
		operator: '==contains',
		label: __( 'Relationships contain' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			const val = field.val();
			// Relationships are stored as strings, use float to compare to field's rule value.
			const ruleVal = parseInt( rule.value );
			let match = false;
			if ( val instanceof Array ) {
				match = val.includes( ruleVal );
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'relationship' );
		},
	} );

	acf.registerConditionType( containsRelationship );

	/**
	 *  Adds condition for Relationship not containing a specific Relationship.
	 *
	 *  @since	6.3
	 */
	var containsNotRelationship = acf.Condition.extend( {
		type: 'containsNotRelationship',
		operator: '!=contains',
		label: __( 'Relationships do not contain' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			const val = field.val();
			// Relationships are stored as strings, use float to compare to field's rule value.
			const ruleVal = parseInt( rule.value );

			let match = true;
			if ( val instanceof Array ) {
				match = ! val.includes( ruleVal );
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'relationship' );
		},
	} );

	acf.registerConditionType( containsNotRelationship );

	/**
	 *  Adds condition for when any relation is selected.
	 *
	 *  @since 6.3
	 */
	var HasAnyRelation = acf.Condition.extend( {
		type: 'hasAnyRelation',
		operator: '!=empty',
		label: __( 'Has any relationship selected' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasAnyRelation );

	/**
	 *  Adds condition for when no relation is selected.
	 *
	 *  @since 6.3
	 */
	var HasNoRelation = acf.Condition.extend( {
		type: 'hasNoRelation',
		operator: '==empty',
		label: __( 'Has no relationship selected' ),
		fieldTypes: [ 'relationship' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return ! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasNoRelation );

	/**
	 *  Adds condition for having post equal to.
	 *
	 *  @since 6.3
	 */
	var HasPostObject = acf.Condition.extend( {
		type: 'hasPostObject',
		operator: '==',
		label: __( 'Post is equal to' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			return isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'post_object' );
		},
	});

	acf.registerConditionType( HasPostObject );

	/**
	 *  Adds condition for selection having post not equal to.
	 *
	 *  @since 6.3
	 */
	var HasPostObjectNotEqual = acf.Condition.extend( {
		type: 'hasPostObjectNotEqual',
		operator: '!==',
		label: __( 'Post is not equal to' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			return ! isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'post_object' );
		},
	});

	acf.registerConditionType( HasPostObjectNotEqual );

	/**
	 *  Adds condition for Relationship containing a specific Relationship.
	 *
	 *  @since 6.3
	 */
	var containsPostObject = acf.Condition.extend( {
		type: 'containsPostObject',
		operator: '==contains',
		label: __( 'Posts contain' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = false;
			if ( val instanceof Array ) {
				match = val.includes( ruleVal );
			} else {
				match = val === ruleVal;
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'post_object' );
		},
	});

	acf.registerConditionType( containsPostObject );

	/**
	 *  Adds condition for Relationship not containing a specific Relationship.
	 *
	 *  @since 6.3
	 */
	var containsNotPostObject = acf.Condition.extend( {
		type: 'containsNotPostObject',
		operator: '!=contains',
		label: __( 'Posts do not contain' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = true;
			if ( val instanceof Array ) {
				match = ! val.includes( ruleVal );	
			} else {
				match = val !== ruleVal;
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'post_object' );
		},
	});

	acf.registerConditionType( containsNotPostObject );

	/**
	 *  Adds condition for when any post is selected.
	 *
	 *  @since 6.3
	 */
	var HasAnyPostObject = acf.Condition.extend( {
		type: 'hasAnyPostObject',
		operator: '!=empty',
		label: __( 'Has any post selected' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !!val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	});

	acf.registerConditionType( HasAnyPostObject );

	/**
	 *  Adds condition for when no post is selected.
	 *
	 *  @since 6.3
	 */
	var HasNoPostObject = acf.Condition.extend( {
		type: 'hasNoPostObject',
		operator: '==empty',
		label: __( 'Has no post selected' ),
		fieldTypes: [
			'post_object',
		],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	});

	acf.registerConditionType( HasNoPostObject );

	/**
	 *  Adds condition for taxonomy having term equal to.
	 *
	 *  @since	6.3
	 */
	var HasTerm = acf.Condition.extend( {
		type: 'hasTerm',
		operator: '==',
		label: __( 'Term is equal to' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			return isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'taxonomy' );
		},
	} );

	acf.registerConditionType( HasTerm );

	/**
	 *  Adds condition for taxonomy having term not equal to.
	 *
	 *  @since	6.3
	 */
	var hasTermNotEqual = acf.Condition.extend( {
		type: 'hasTermNotEqual',
		operator: '!==',
		label: __( 'Term is not equal to' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			return ! isEqualToNumber( rule.value, field.val() );
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'taxonomy' );
		},
	} );

	acf.registerConditionType( hasTermNotEqual );

	/**
	 *  Adds condition for taxonomy containing a specific term.
	 *
	 *  @since	6.3
	 */
	var containsTerm = acf.Condition.extend( {
		type: 'containsTerm',
		operator: '==contains',
		label: __( 'Terms contain' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;
			let match = false;
			if ( val instanceof Array ) {
				match = val.includes( ruleVal );
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'taxonomy' );
		},
	} );

	acf.registerConditionType( containsTerm );

	/**
	 *  Adds condition for taxonomy not containing a specific term.
	 *
	 *  @since	6.3
	 */
	var containsNotTerm = acf.Condition.extend( {
		type: 'containsNotTerm',
		operator: '!=contains',
		label: __( 'Terms do not contain' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			const val = field.val();
			const ruleVal = rule.value;

			let match = true;
			if ( val instanceof Array ) {
				match = ! val.includes( ruleVal );
			}
			return match;
		},
		choices: function ( fieldObject ) {
			return conditionalSelect2( fieldObject, 'taxonomy' );
		},
	} );

	acf.registerConditionType( containsNotTerm );

	/**
	 *  Adds condition for when any term is selected.
	 *
	 *  @since	6.3
	 */
	var HasAnyTerm = acf.Condition.extend( {
		type: 'hasAnyTerm',
		operator: '!=empty',
		label: __( 'Has any term selected' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return !! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasAnyTerm );

	/**
	 *  Adds condition for when no term is selected.
	 *
	 *  @since	6.3
	 */
	var HasNoTerm = acf.Condition.extend( {
		type: 'hasNoTerm',
		operator: '==empty',
		label: __( 'Has no term selected' ),
		fieldTypes: [ 'taxonomy' ],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return ! val;
		},
		choices: function () {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasNoTerm );

	/**
	 *  hasValue
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var HasValue = acf.Condition.extend( {
		type: 'hasValue',
		operator: '!=empty',
		label: __( 'Has any value' ),
		fieldTypes: [
			'text',
			'textarea',
			'number',
			'range',
			'email',
			'url',
			'password',
			'image',
			'file',
			'wysiwyg',
			'oembed',
			'select',
			'checkbox',
			'radio',
			'button_group',
			'link',
			'google_map',
			'date_picker',
			'date_time_picker',
			'time_picker',
			'color_picker',
			'icon_picker',
		],
		match: function ( rule, field ) {
			let val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return val ? true : false;
		},
		choices: function ( fieldObject ) {
			return '<input type="text" disabled />';
		},
	} );

	acf.registerConditionType( HasValue );

	/**
	 *  hasValue
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var HasNoValue = HasValue.extend( {
		type: 'hasNoValue',
		operator: '==empty',
		label: __( 'Has no value' ),
		match: function ( rule, field ) {
			return ! HasValue.prototype.match.apply( this, arguments );
		},
	} );

	acf.registerConditionType( HasNoValue );

	/**
	 *  EqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var EqualTo = acf.Condition.extend( {
		type: 'equalTo',
		operator: '==',
		label: __( 'Value is equal to' ),
		fieldTypes: [
			'text',
			'textarea',
			'number',
			'range',
			'email',
			'url',
			'password',
		],
		match: function ( rule, field ) {
			if ( acf.isNumeric( rule.value ) ) {
				return isEqualToNumber( rule.value, field.val() );
			} else {
				return isEqualTo( rule.value, field.val() );
			}
		},
		choices: function ( fieldObject ) {
			return '<input type="text" />';
		},
	} );

	acf.registerConditionType( EqualTo );

	/**
	 *  NotEqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var NotEqualTo = EqualTo.extend( {
		type: 'notEqualTo',
		operator: '!=',
		label: __( 'Value is not equal to' ),
		match: function ( rule, field ) {
			return ! EqualTo.prototype.match.apply( this, arguments );
		},
	} );

	acf.registerConditionType( NotEqualTo );

	/**
	 *  PatternMatch
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var PatternMatch = acf.Condition.extend( {
		type: 'patternMatch',
		operator: '==pattern',
		label: __( 'Value matches pattern' ),
		fieldTypes: [
			'text',
			'textarea',
			'email',
			'url',
			'password',
			'wysiwyg',
		],
		match: function ( rule, field ) {
			return matchesPattern( field.val(), rule.value );
		},
		choices: function ( fieldObject ) {
			return '<input type="text" placeholder="[a-z0-9]" />';
		},
	} );

	acf.registerConditionType( PatternMatch );

	/**
	 *  Contains
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var Contains = acf.Condition.extend( {
		type: 'contains',
		operator: '==contains',
		label: __( 'Value contains' ),
		fieldTypes: [
			'text',
			'textarea',
			'number',
			'email',
			'url',
			'password',
			'wysiwyg',
			'oembed',
			'select',
		],
		match: function ( rule, field ) {
			return containsString( field.val(), rule.value );
		},
		choices: function ( fieldObject ) {
			return '<input type="text" />';
		},
	} );

	acf.registerConditionType( Contains );

	/**
	 *  TrueFalseEqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var TrueFalseEqualTo = EqualTo.extend( {
		type: 'trueFalseEqualTo',
		choiceType: 'select',
		fieldTypes: [ 'true_false' ],
		choices: function ( field ) {
			return [
				{
					id: 1,
					text: __( 'Checked' ),
				},
			];
		},
	} );

	acf.registerConditionType( TrueFalseEqualTo );

	/**
	 *  TrueFalseNotEqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var TrueFalseNotEqualTo = NotEqualTo.extend( {
		type: 'trueFalseNotEqualTo',
		choiceType: 'select',
		fieldTypes: [ 'true_false' ],
		choices: function ( field ) {
			return [
				{
					id: 1,
					text: __( 'Checked' ),
				},
			];
		},
	} );

	acf.registerConditionType( TrueFalseNotEqualTo );

	/**
	 *  SelectEqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var SelectEqualTo = acf.Condition.extend( {
		type: 'selectEqualTo',
		operator: '==',
		label: __( 'Value is equal to' ),
		fieldTypes: [ 'select', 'checkbox', 'radio', 'button_group' ],
		match: function ( rule, field ) {
			var val = field.val();
			if ( val instanceof Array ) {
				return inArray( rule.value, val );
			} else {
				return isEqualTo( rule.value, val );
			}
		},
		choices: function ( fieldObject ) {
			// vars
			var choices = [];
			var lines = fieldObject
				.$setting( 'choices textarea' )
				.val()
				.split( '\n' );

			// allow null
			if ( fieldObject.$input( 'allow_null' ).prop( 'checked' ) ) {
				choices.push( {
					id: '',
					text: __( 'Null' ),
				} );
			}

			// loop
			lines.map( function ( line ) {
				// split
				line = line.split( ':' );

				// default label to value
				line[ 1 ] = line[ 1 ] || line[ 0 ];

				// append
				choices.push( {
					id: line[ 0 ].trim(),
					text: line[ 1 ].trim(),
				} );
			} );

			// return
			return choices;
		},
	} );

	acf.registerConditionType( SelectEqualTo );

	/**
	 *  SelectNotEqualTo
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var SelectNotEqualTo = SelectEqualTo.extend( {
		type: 'selectNotEqualTo',
		operator: '!=',
		label: __( 'Value is not equal to' ),
		match: function ( rule, field ) {
			return ! SelectEqualTo.prototype.match.apply( this, arguments );
		},
	} );

	acf.registerConditionType( SelectNotEqualTo );

	/**
	 *  GreaterThan
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var GreaterThan = acf.Condition.extend( {
		type: 'greaterThan',
		operator: '>',
		label: __( 'Value is greater than' ),
		fieldTypes: [ 'number', 'range' ],
		match: function ( rule, field ) {
			var val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			return isGreaterThan( val, rule.value );
		},
		choices: function ( fieldObject ) {
			return '<input type="number" />';
		},
	} );

	acf.registerConditionType( GreaterThan );

	/**
	 *  LessThan
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var LessThan = GreaterThan.extend( {
		type: 'lessThan',
		operator: '<',
		label: __( 'Value is less than' ),
		match: function ( rule, field ) {
			var val = field.val();
			if ( val instanceof Array ) {
				val = val.length;
			}
			if ( val === undefined || val === null || val === false ) {
				return true;
			}
			return isLessThan( val, rule.value );
		},
		choices: function ( fieldObject ) {
			return '<input type="number" />';
		},
	} );

	acf.registerConditionType( LessThan );

	/**
	 *  SelectedGreaterThan
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var SelectionGreaterThan = GreaterThan.extend( {
		type: 'selectionGreaterThan',
		label: __( 'Selection is greater than' ),
		fieldTypes: [
			'checkbox',
			'select',
			'post_object',
			'page_link',
			'relationship',
			'taxonomy',
			'user',
		],
	} );

	acf.registerConditionType( SelectionGreaterThan );

	/**
	 *  SelectionLessThan
	 *
	 *  @date	1/2/18
	 *  @since	5.6.5
	 *
	 *  @param	void
	 *  @return	void
	 */
	var SelectionLessThan = LessThan.extend( {
		type: 'selectionLessThan',
		label: __( 'Selection is less than' ),
		fieldTypes: [
			'checkbox',
			'select',
			'post_object',
			'page_link',
			'relationship',
			'taxonomy',
			'user',
		],
	} );

	acf.registerConditionType( SelectionLessThan );
} )( jQuery );
